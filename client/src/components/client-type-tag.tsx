import { Badge } from "@/components/ui/badge";

type ClientType = "nouveau" | "ancien" | "timewaster" | "spender" | "unknown";

interface ClientTypeTagProps {
  type: ClientType;
}

const typeConfig = {
  nouveau: {
    label: "Nouveau",
    className: "bg-[hsl(200_70%_40%)] text-white border-0",
  },
  ancien: {
    label: "Ancien",
    className: "bg-[hsl(142_60%_40%)] text-white border-0",
  },
  timewaster: {
    label: "Timewaster",
    className: "bg-[hsl(0_70%_45%)] text-white border-0",
  },
  spender: {
    label: "Spender",
    className: "bg-[hsl(45_90%_45%)] text-white border-0",
  },
  unknown: {
    label: "Non défini",
    className: "bg-muted text-muted-foreground",
  },
};

export function ClientTypeTag({ type }: ClientTypeTagProps) {
  const config = typeConfig[type];
  
  return (
    <Badge 
      className={config.className}
      data-testid={`tag-client-${type}`}
    >
      {config.label}
    </Badge>
  );
}
