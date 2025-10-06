import { AiResponseCard } from "../ai-response-card";
import { Toaster } from "@/components/ui/toaster";

export default function AiResponseCardExample() {
  return (
    <div className="space-y-4 max-w-2xl">
      <AiResponseCard
        phase="relation"
        mainResponse="Hey ! Comment ça va ? 😊 T'as passé une bonne journée ? J'adore trop parler avec toi, tu me fais rire à chaque fois mdrr 😂"
        suggestions={[
          "T'es d'où au fait ? 🤔",
          "Tu fais quoi comme métier ? 👀",
          "T'as des animaux de compagnie ? 🐶",
        ]}
      />
      
      <AiResponseCard
        phase="sexualisation"
        mainResponse="Alors dis-moi... c'est quoi ton plus grand fantasme ? 😏 Je suis super curieuse de savoir ce qui te fait vraiment craquer 🔥"
        suggestions={[
          "Tu préfères les filles douces ou dominantes ? 😈",
          "Raconte-moi le truc le plus fou que t'as jamais fait 🤭",
        ]}
      />
      <Toaster />
    </div>
  );
}
