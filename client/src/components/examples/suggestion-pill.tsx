import { SuggestionPill } from "../suggestion-pill";
import { Toaster } from "@/components/ui/toaster";

export default function SuggestionPillExample() {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <SuggestionPill text="Hey bb comment ça va ? 😘" />
        <SuggestionPill text="T'as passé une bonne journée ? 😊" />
        <SuggestionPill text="T'es où là ? 👀" variant="outline" />
      </div>
      <Toaster />
    </div>
  );
}
