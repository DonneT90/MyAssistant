import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sparkles, GraduationCap, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface TrainingResponse {
  question: string;
  answer: string;
  context: string;
}

export default function Training() {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responses, setResponses] = useState<TrainingResponse[]>([]);
  const { toast } = useToast();

  const handleSubmitQuestion = async () => {
    if (!question.trim()) {
      toast({
        title: "Attention",
        description: "Veuillez entrer une question",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const res = await fetch("/api/training", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: question.trim() }),
        credentials: "include",
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || `Erreur ${res.status}`);
      }

      const response = await res.json();

      if (response.success && response.data) {
        setResponses([response.data, ...responses]);
        setQuestion("");
        
        toast({
          title: "Réponse générée",
          description: "La réponse a été générée avec succès!",
        });
      }
    } catch (error: any) {
      console.error("Error submitting question:", error);
      toast({
        title: "Erreur",
        description: error.message || "Impossible de générer une réponse.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copié!",
      description: "La réponse a été copiée dans le presse-papiers",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">
                Entraînement Recrutement
              </h1>
              <p className="text-xs text-muted-foreground">Préparez vos entretiens</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-6 md:py-8">
        <div className="mx-auto max-w-4xl space-y-6 md:space-y-8">
          {/* Info Card */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <GraduationCap className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-2">Mode Entraînement</h3>
                  <p className="text-sm text-muted-foreground">
                    Entrez les questions posées pendant votre recrutement et obtenez les réponses correctes basées sur la méthodologie de chatting OnlyFans.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Question Input */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Question de recrutement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Exemple: Quelles sont les 5 phases du chatting OnlyFans ?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={4}
                className="resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.ctrlKey) {
                    handleSubmitQuestion();
                  }
                }}
              />
              <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground order-2 sm:order-1">
                  Appuyez sur Ctrl+Enter pour envoyer
                </p>
                <Button 
                  onClick={handleSubmitQuestion} 
                  disabled={isLoading || !question.trim()}
                  className="gap-2 order-1 sm:order-2 w-full sm:w-auto"
                >
                  <Sparkles className="h-4 w-4" />
                  {isLoading ? "Génération..." : "Obtenir la réponse"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Responses */}
          {responses.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Réponses d'entraînement
              </h2>
              <ScrollArea className="h-[600px] pr-2 md:pr-4">
                <div className="space-y-4">
                  {responses.map((response, idx) => (
                    <Card key={idx} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <div className="flex items-start gap-2">
                          <Badge variant="secondary" className="flex-shrink-0">Question</Badge>
                          <p className="text-sm font-medium flex-1 min-w-0 break-words">{response.question}</p>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="default" className="flex-shrink-0">Réponse</Badge>
                          </div>
                          <div className="rounded-lg bg-muted p-4 space-y-3">
                            <p className="text-sm whitespace-pre-wrap break-words">{response.answer}</p>
                            {response.context && (
                              <div className="pt-3 border-t border-border">
                                <p className="text-xs text-muted-foreground mb-2 font-medium">Contexte:</p>
                                <p className="text-xs text-muted-foreground whitespace-pre-wrap break-words">
                                  {response.context}
                                </p>
                              </div>
                            )}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopy(response.answer)}
                            className="w-full sm:w-auto"
                          >
                            Copier la réponse
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {/* Example Questions */}
          {responses.length === 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold">Exemples de questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    "Quelles sont les 5 phases du chatting OnlyFans ?",
                    "Comment gérer un client Timewaster ?",
                    "Quelle est la différence entre un client nouveau et ancien ?",
                    "Qu'est-ce que la technique PUSH PULL ?",
                    "Comment chauffer un client avant le script ?",
                    "Quelles informations demander en phase Relation ?"
                  ].map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => setQuestion(q)}
                      className="w-full text-left p-3 rounded-lg border bg-card hover:bg-accent transition-colors text-sm"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 mt-12">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          <p>Mode entraînement pour entretiens de recrutement • Propulsé par Gemini AI</p>
        </div>
      </footer>
    </div>
  );
}
