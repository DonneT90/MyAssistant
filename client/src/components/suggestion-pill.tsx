import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface SuggestionPillProps {
  text: string;
  variant?: "default" | "outline";
}

export function SuggestionPill({ text, variant = "default" }: SuggestionPillProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      description: "Copié dans le presse-papier",
      duration: 2000,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant={variant}
      size="sm"
      onClick={handleCopy}
      className="h-auto py-1.5 px-3 text-xs font-normal hover-elevate active-elevate-2"
      data-testid="button-copy-suggestion"
    >
      <span className="mr-2">{text}</span>
      {copied ? (
        <Check className="h-3 w-3 text-green-500" />
      ) : (
        <Copy className="h-3 w-3 opacity-50" />
      )}
    </Button>
  );
}
