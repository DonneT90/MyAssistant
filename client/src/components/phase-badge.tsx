import { Badge } from "@/components/ui/badge";

type Phase = "relation" | "qualification" | "sexualisation" | "chauffe" | "script" | "unknown";

interface PhaseBadgeProps {
  phase: Phase;
}

const phaseConfig = {
  relation: {
    label: "Relation",
    className: "bg-[hsl(200_70%_55%)] text-white border-0",
  },
  qualification: {
    label: "Qualification",
    className: "bg-[hsl(142_60%_50%)] text-white border-0",
  },
  sexualisation: {
    label: "Sexualisation",
    className: "bg-[hsl(330_75%_55%)] text-white border-0",
  },
  chauffe: {
    label: "Chauffe",
    className: "bg-[hsl(25_80%_55%)] text-white border-0",
  },
  script: {
    label: "Script",
    className: "bg-[hsl(260_70%_60%)] text-white border-0",
  },
  unknown: {
    label: "Général",
    className: "bg-muted text-muted-foreground",
  },
};

export function PhaseBadge({ phase }: PhaseBadgeProps) {
  const config = phaseConfig[phase];
  
  return (
    <Badge 
      className={config.className}
      data-testid={`badge-phase-${phase}`}
    >
      {config.label}
    </Badge>
  );
}
