import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Conversation {
  id: string;
  userMessage: string;
  aiResponse: string;
  phase: string | null;
  clientType: string | null;
  createdAt: Date | null;
}

const phaseColors: Record<string, string> = {
  relation: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  qualification: "bg-green-500/10 text-green-500 border-green-500/20",
  sexualisation: "bg-red-500/10 text-red-500 border-red-500/20",
  chauffe: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  script: "bg-purple-500/10 text-purple-500 border-purple-500/20",
};

const phaseLabels: Record<string, string> = {
  relation: "Relation",
  qualification: "Qualification",
  sexualisation: "Sexualisation",
  chauffe: "Chauffe",
  script: "Script",
};

export function ConversationHistory() {
  const { toast } = useToast();
  
  const { data: conversations, isLoading } = useQuery<{ success: boolean; data: Conversation[] }>({
    queryKey: ["/api/conversations"],
    refetchInterval: 30000,
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copié !",
      description: "Le texte a été copié dans le presse-papier",
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Clock className="h-4 w-4" />
            Historique des conversations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Chargement...</p>
        </CardContent>
      </Card>
    );
  }

  const conversationsList = conversations?.data || [];

  if (conversationsList.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <Clock className="h-4 w-4" />
          Historique récent
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {conversationsList.map((conv) => (
              <Card key={conv.id} className="hover-elevate">
                <CardContent className="pt-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      {conv.phase && (
                        <Badge 
                          variant="outline" 
                          className={phaseColors[conv.phase] || ""}
                          data-testid={`badge-phase-${conv.phase}`}
                        >
                          {phaseLabels[conv.phase] || conv.phase}
                        </Badge>
                      )}
                      {conv.clientType && (
                        <Badge variant="secondary" data-testid={`badge-client-${conv.clientType}`}>
                          {conv.clientType}
                        </Badge>
                      )}
                    </div>
                    {conv.createdAt && (
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {format(new Date(conv.createdAt), "HH:mm", { locale: fr })}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Votre question:</p>
                      <p className="text-sm" data-testid="text-user-message">{conv.userMessage}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs text-muted-foreground">Réponse suggérée:</p>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(conv.aiResponse)}
                          className="h-6 w-6"
                          data-testid="button-copy-history"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-sm line-clamp-3" data-testid="text-ai-response">
                        {conv.aiResponse}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
