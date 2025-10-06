import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface KnowledgeCardProps {
  icon: string;
  title: string;
  description: string;
  onClick?: () => void;
}

export function KnowledgeCard({ icon, title, description, onClick }: KnowledgeCardProps) {
  return (
    <Card className="hover-elevate cursor-pointer transition-all" onClick={onClick} data-testid={`card-knowledge-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="space-y-3">
        <div className="text-4xl">{icon}</div>
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-primary hover:text-primary">
          Voir détails
          <ChevronRight className="ml-1 h-3 w-3" />
        </Button>
      </CardContent>
    </Card>
  );
}
