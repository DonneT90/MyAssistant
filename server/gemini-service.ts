import { GoogleGenAI } from "@google/genai";
import { KNOWLEDGE_BASE, MESSAGE_TEMPLATES } from "./knowledge-base";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY environment variable is required");
}

const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

interface ChatContext {
  phase?: "relation" | "qualification" | "sexualisation" | "chauffe" | "script" | "unknown";
  clientType?: "nouveau" | "ancien" | "timewaster" | "spender" | "unknown";
}

interface ChatResponse {
  mainResponse: string;
  suggestions: string[];
  detectedPhase?: string;
  detectedClientType?: string;
  emojis: string[];
}

function buildSystemPrompt(): string {
  return `Tu es un expert en chatting OnlyFans, spécialisé dans la création de relations virtuelles et la maximisation des revenus. 

## TES COMPÉTENCES
Tu maîtrises parfaitement les 5 phases du chatting:
1. RELATION: Créer un lien fort, demander prénom, âge, métier, passions
2. QUALIFICATION: Vérifier que le client est seul et disponible
3. SEXUALISATION: Introduire progressivement le sujet sexuel
4. CHAUFFE: Augmenter l'excitation avant la vente
5. SCRIPT: Vendre du contenu en suivant un script précis

## TYPES DE CLIENTS
- NOUVEAU: Première conversation, besoin de tout découvrir
- ANCIEN: Client régulier, déjà familier
- TIMEWASTER: Dépense peu, nécessite négociation
- SPENDER: Dépense facilement, client précieux à préserver

## RÈGLES ABSOLUES
1. Toujours utiliser beaucoup d'emojis appropriés (😊😍😘🥺😏😈🔥)
2. Parler comme une jeune femme moderne et naturelle
3. Rebondir sur ce que dit le client
4. Poser des questions pour maintenir la conversation
5. Créer un lien émotionnel fort
6. Adapter le ton selon la phase et le type de client
7. Utiliser la technique PUSH PULL (commentaire sexy + question sérieuse)
8. Faire croire subtilement que la modèle habite près du client
9. Ne JAMAIS être plus excité que le client
10. Utiliser souvent le prénom du client

## TA MISSION
Pour chaque message du chatteur, tu dois:
1. Analyser le contexte et la situation
2. Générer une réponse principale optimale avec emojis
3. Proposer 3-5 suggestions alternatives
4. Détecter la phase actuelle du client
5. Suggérer des emojis appropriés

Sois créative, authentique et orientée résultats. Le client doit se sentir spécial et avoir envie de dépenser.`;
}

function buildUserPrompt(userMessage: string, context: ChatContext): string {
  const phaseInfo = context.phase && context.phase !== "unknown" 
    ? `\n\nPHASE ACTUELLE: ${KNOWLEDGE_BASE.phases[context.phase]?.name || "Non définie"}` 
    : "";
  
  const clientTypeInfo = context.clientType && context.clientType !== "unknown"
    ? `\nTYPE DE CLIENT: ${KNOWLEDGE_BASE.client_types[context.clientType]?.name || "Non défini"}`
    : "";

  return `${phaseInfo}${clientTypeInfo}

SITUATION DU CHATTEUR:
${userMessage}

Fournis une réponse au format JSON avec:
{
  "mainResponse": "La meilleure réponse à envoyer (avec emojis)",
  "suggestions": ["Alternative 1", "Alternative 2", "Alternative 3", "Alternative 4"],
  "detectedPhase": "relation|qualification|sexualisation|chauffe|script|unknown",
  "detectedClientType": "nouveau|ancien|timewaster|spender|unknown",
  "emojis": ["😊", "😍", "..."],
  "explanation": "Bref conseil stratégique"
}

IMPORTANT:
- Utilise beaucoup d'emojis variés et appropriés
- Sois naturelle et spontanée dans le ton
- Adapte le niveau de sexualisation à la phase
- Donne des réponses différentes dans les suggestions
- Fais rebondir la conversation avec des questions`;
}

export async function generateChatResponse(
  userMessage: string, 
  context: ChatContext = {}
): Promise<ChatResponse> {
  try {
    const systemPrompt = buildSystemPrompt();
    const userPrompt = buildUserPrompt(userMessage, context);

    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.9,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 2048,
      },
      contents: userPrompt
    });

    const text = result.text || "";
    
    // Extract JSON from response (handle markdown code blocks)
    let jsonText = text;
    const jsonMatch = text.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/);
    if (jsonMatch) {
      jsonText = jsonMatch[1];
    } else {
      // Try to find JSON object in the text
      const jsonStart = text.indexOf('{');
      const jsonEnd = text.lastIndexOf('}');
      if (jsonStart !== -1 && jsonEnd !== -1) {
        jsonText = text.substring(jsonStart, jsonEnd + 1);
      }
    }

    const parsedResponse = JSON.parse(jsonText);

    return {
      mainResponse: parsedResponse.mainResponse || "",
      suggestions: parsedResponse.suggestions || [],
      detectedPhase: parsedResponse.detectedPhase,
      detectedClientType: parsedResponse.detectedClientType,
      emojis: parsedResponse.emojis || []
    };
  } catch (error) {
    console.error("Error generating chat response:", error);
    
    // Fallback response en cas d'erreur
    const fallbackEmojis = (context.phase && context.phase !== "unknown" && KNOWLEDGE_BASE.emojis[context.phase as keyof typeof KNOWLEDGE_BASE.emojis])
      ? KNOWLEDGE_BASE.emojis[context.phase as keyof typeof KNOWLEDGE_BASE.emojis]
      : KNOWLEDGE_BASE.emojis.general;

    return {
      mainResponse: "Hey ! 😊 Je suis là pour t'aider. Dis-moi plus précisément ce que le client t'a écrit et je te donnerai la meilleure réponse possible 💕",
      suggestions: [
        "Comment ça va ? T'as passé une bonne journée ? 😊",
        "Coucou toi ! Qu'est-ce que tu deviens ? 😘",
        "Hey ! Content de te voir par ici 🥰"
      ],
      detectedPhase: context.phase || "unknown",
      detectedClientType: context.clientType || "unknown",
      emojis: fallbackEmojis.slice(0, 5)
    };
  }
}

export async function analyzeClientMessage(
  clientMessage: string
): Promise<{ phase: string; clientType: string; insights: string }> {
  try {
    const prompt = `En tant qu'expert du chatting OnlyFans, analyse ce message d'un client:

"${clientMessage}"

Détermine:
1. La phase probable: relation, qualification, sexualisation, chauffe, script, ou unknown
2. Le type de client probable: nouveau, ancien, timewaster, spender, ou unknown
3. Des insights stratégiques

Réponds en JSON:
{
  "phase": "...",
  "clientType": "...",
  "insights": "..."
}`;

    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });
    const text = result.text || "";
    
    let jsonText = text;
    const jsonMatch = text.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/);
    if (jsonMatch) {
      jsonText = jsonMatch[1];
    }

    const analysis = JSON.parse(jsonText);
    return {
      phase: analysis.phase || "unknown",
      clientType: analysis.clientType || "unknown",
      insights: analysis.insights || ""
    };
  } catch (error) {
    console.error("Error analyzing client message:", error);
    return {
      phase: "unknown",
      clientType: "unknown",
      insights: "Impossible d'analyser le message pour le moment."
    };
  }
}

export async function generateTrainingAnswer(
  question: string
): Promise<{ question: string; answer: string; context: string }> {
  try {
    const systemPrompt = `Tu es un expert en chatting OnlyFans qui aide les candidats à se préparer pour leurs entretiens de recrutement.

Ta mission est de répondre aux questions de recrutement en te basant sur la méthodologie complète du chatting OnlyFans:

LES 5 PHASES:
1. RELATION: Créer une relation solide, demander prénom, âge, métier, passions. Utiliser beaucoup d'emojis et créer un lien fort.
2. QUALIFICATION: S'assurer que le client est seul et disponible avant de continuer.
3. SEXUALISATION: Introduire progressivement le sujet sexuel, partager des fantasmes, utiliser la technique PUSH PULL.
4. CHAUFFE: Chauffer le client avant le script, ne jamais être plus excité que lui.
5. SCRIPT: Vendre du contenu en suivant le script, envoyer 4-5 messages entre chaque média payant.

TYPES DE CLIENTS:
- NOUVEAU: Première conversation, suivre les 5 phases depuis le début
- ANCIEN: Client régulier, faire du relationnel puis reprendre à QUALIFICATION
- TIMEWASTER: Dépense peu, négocier puis renommer TW1, TW2, ne pas prioriser
- SPENDER: Dépense beaucoup, faire du relationnel après scripts, proposer du contenu premium

RÈGLES D'OR:
- Toujours utiliser beaucoup d'emojis appropriés
- Parler comme une jeune femme moderne et naturelle
- Rebondir sur ce que dit le client
- Utiliser le prénom du client souvent
- Créer un lien émotionnel fort
- Ne JAMAIS être plus excité que le client
- Faire croire que la modèle habite près du client

Fournis des réponses complètes, précises et professionnelles basées sur cette méthodologie.`;

    const userPrompt = `Question de recrutement: "${question}"

Réponds en JSON avec:
{
  "answer": "Réponse détaillée et complète à la question",
  "context": "Contexte et conseils supplémentaires pertinents"
}`;

    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
        topP: 0.9,
        maxOutputTokens: 2048,
      },
      contents: userPrompt
    });

    const text = result.text || "";
    
    let jsonText = text;
    const jsonMatch = text.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/);
    if (jsonMatch) {
      jsonText = jsonMatch[1];
    } else {
      const jsonStart = text.indexOf('{');
      const jsonEnd = text.lastIndexOf('}');
      if (jsonStart !== -1 && jsonEnd !== -1) {
        jsonText = text.substring(jsonStart, jsonEnd + 1);
      }
    }

    const parsedResponse = JSON.parse(jsonText);

    return {
      question,
      answer: parsedResponse.answer || "Aucune réponse générée",
      context: parsedResponse.context || ""
    };
  } catch (error) {
    console.error("Error generating training answer:", error);
    
    return {
      question,
      answer: "Désolé, je n'ai pas pu générer une réponse pour cette question. Veuillez réessayer.",
      context: "Erreur lors de la génération de la réponse."
    };
  }
}
