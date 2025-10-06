import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Copy, ChevronDown, ChevronUp } from "lucide-react";
import { PhaseBadge } from "./phase-badge";
import { SuggestionPill } from "./suggestion-pill";
import { useToast } from "@/hooks/use-toast";

interface AiResponseCardProps {
  phase: "relation" | "qualification" | "sexualisation" | "chauffe" | "script" | "unknown";
  mainResponse: string;
  suggestions?: string[];
}

export function AiResponseCard({ phase, mainResponse, suggestions = [] }: AiResponseCardProps) {
  const [copied, setCopied] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const { toast } = useToast();

  const handleCopyMain = () => {
    navigator.clipboard.writeText(mainResponse);
    setCopied(true);
    toast({
      description: "Réponse copiée dans le presse-papier",
      duration: 2000,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="hover-elevate" data-testid="card-ai-response">
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-3">
        <PhaseBadge phase={phase} />
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopyMain}
          data-testid="button-copy-main"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed whitespace-pre-wrap" data-testid="text-main-response">
          {mainResponse}
        </p>
        
        {suggestions.length > 0 && (
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSuggestions(!showSuggestions)}
              className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
              data-testid="button-toggle-suggestions"
            >
              {showSuggestions ? (
                <>
                  <ChevronUp className="h-3 w-3 mr-1" />
                  Masquer les suggestions
                </>
              ) : (
                <>
                  <ChevronDown className="h-3 w-3 mr-1" />
                  Voir {suggestions.length} suggestions
                </>
              )}
            </Button>
            
            {showSuggestions && (
              <div className="flex flex-wrap gap-2" data-testid="container-suggestions">
                {suggestions.map((suggestion, idx) => (
                  <SuggestionPill key={idx} text={suggestion} variant="outline" />
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
