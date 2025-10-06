import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContextSelectorProps {
  phase: string;
  clientType: string;
  onPhaseChange: (phase: string) => void;
  onClientTypeChange: (type: string) => void;
}

export function ContextSelector({
  phase,
  clientType,
  onPhaseChange,
  onClientTypeChange,
}: ContextSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="phase-select" className="text-sm font-medium">
          Phase du client
        </Label>
        <Select value={phase} onValueChange={onPhaseChange}>
          <SelectTrigger id="phase-select" data-testid="select-phase">
            <SelectValue placeholder="Sélectionner la phase" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="unknown">Non définie</SelectItem>
            <SelectItem value="relation">Relation</SelectItem>
            <SelectItem value="qualification">Qualification</SelectItem>
            <SelectItem value="sexualisation">Sexualisation</SelectItem>
            <SelectItem value="chauffe">Chauffe</SelectItem>
            <SelectItem value="script">Script</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="client-type-select" className="text-sm font-medium">
          Type de client
        </Label>
        <Select value={clientType} onValueChange={onClientTypeChange}>
          <SelectTrigger id="client-type-select" data-testid="select-client-type">
            <SelectValue placeholder="Sélectionner le type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="unknown">Non défini</SelectItem>
            <SelectItem value="nouveau">Nouveau</SelectItem>
            <SelectItem value="ancien">Ancien</SelectItem>
            <SelectItem value="timewaster">Timewaster</SelectItem>
            <SelectItem value="spender">Spender</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
