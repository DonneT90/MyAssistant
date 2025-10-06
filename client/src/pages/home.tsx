import { useState } from "react";
import { ChatInput } from "@/components/chat-input";
import { ContextSelector } from "@/components/context-selector";
import { AiResponseCard } from "@/components/ai-response-card";
import { KnowledgeCard } from "@/components/knowledge-card";
import { ConversationHistory } from "@/components/conversation-history";
import { ThemeToggle } from "@/components/theme-toggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, BookOpen, GraduationCap } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

interface AIResponse {
  mainResponse: string;
  suggestions: string[];
  detectedPhase?: string;
  detectedClientType?: string;
  emojis: string[];
}

export default function Home() {
  const [phase, setPhase] = useState("unknown");
  const [clientType, setClientType] = useState("unknown");
  const [isLoading, setIsLoading] = useState(false);
  const [responses, setResponses] = useState<Array<{
    id: number;
    phase: any;
    mainResponse: string;
    suggestions: string[];
    emojis?: string[];
  }>>([]);
  const { toast } = useToast();

  const handleSendMessage = async (message: string) => {
    setIsLoading(true);
    
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          context: {
            phase: phase !== "unknown" ? phase : undefined,
            clientType: clientType !== "unknown" ? clientType : undefined,
          }
        }),
        credentials: "include",
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || `Erreur ${res.status}`);
      }

      const response: { success: boolean; data: AIResponse } = await res.json();

      if (response.success && response.data) {
        const aiResponse = {
          id: Date.now(),
          phase: response.data.detectedPhase || phase,
          mainResponse: response.data.mainResponse,
          suggestions: response.data.suggestions,
          emojis: response.data.emojis,
        };
        
        setResponses([aiResponse, ...responses]);
        
        if (response.data.detectedPhase && response.data.detectedPhase !== "unknown") {
          setPhase(response.data.detectedPhase);
        }
        if (response.data.detectedClientType && response.data.detectedClientType !== "unknown") {
          setClientType(response.data.detectedClientType);
        }
      }
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: "Erreur",
        description: error.message || "Impossible de générer une réponse. Vérifiez votre connexion.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const knowledgeBase = [
    {
      icon: "💬",
      title: "Phase Relation",
      description: "Créer une relation solide pour fidéliser le fan. Plus il est attaché, plus il dépensera facilement.",
    },
    {
      icon: "✅",
      title: "Phase Qualification",
      description: "S'assurer que le client est seul chez lui pour qu'il soit en état émotionnel favorable à l'achat.",
    },
    {
      icon: "🔥",
      title: "Phase Sexualisation",
      description: "Introduire le sujet sexuel pour exciter le client et créer une connexion plus intime.",
    },
    {
      icon: "🌡️",
      title: "Phase Chauffe",
      description: "Chauffer encore plus le client avant de commencer le script pour s'assurer qu'il est VRAIMENT excité.",
    },
    {
      icon: "📝",
      title: "Phase Script",
      description: "Débuter le script prédéfini en respectant chaque étape pour maximiser les achats.",
    },
    {
      icon: "🎯",
      title: "Gestion Timewaster",
      description: "Techniques de négociation et stratégies pour gérer les clients qui ne dépensent pas.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground flex-shrink-0">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg font-semibold truncate" data-testid="text-app-title">
                Assistant Chatting
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Votre coach IA OnlyFans</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/training">
              <Button variant="outline" size="sm" className="gap-2">
                <GraduationCap className="h-4 w-4" />
                <span className="hidden sm:inline">Entraînement</span>
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-6 md:py-8">
        <div className="mx-auto max-w-4xl space-y-6 md:space-y-8">
          {/* Context Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Contexte de la conversation</CardTitle>
            </CardHeader>
            <CardContent>
              <ContextSelector
                phase={phase}
                clientType={clientType}
                onPhaseChange={setPhase}
                onClientTypeChange={setClientType}
              />
            </CardContent>
          </Card>

          {/* Chat Input */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Posez votre question</CardTitle>
            </CardHeader>
            <CardContent>
              <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
            </CardContent>
          </Card>

          {/* Responses */}
          {responses.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Suggestions IA
              </h2>
              <ScrollArea className="h-[400px] md:h-[600px] pr-4">
                <div className="space-y-4 pb-4">
                  {responses.map((response) => (
                    <AiResponseCard
                      key={response.id}
                      phase={response.phase}
                      mainResponse={response.mainResponse}
                      suggestions={response.suggestions}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {/* Conversation History */}
          <ConversationHistory />

          {/* Knowledge Base */}
          {responses.length === 0 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Base de connaissances
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {knowledgeBase.map((item, idx) => (
                  <KnowledgeCard
                    key={idx}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                    onClick={() => console.log(`${item.title} clicked`)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 mt-12">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          <p>Assistant professionnel pour chatteurs OnlyFans • Propulsé par Gemini AI</p>
        </div>
      </footer>
    </div>
  );
}
