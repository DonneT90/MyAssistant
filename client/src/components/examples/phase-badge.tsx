import { PhaseBadge } from "../phase-badge";

export default function PhaseBadgeExample() {
  return (
    <div className="flex flex-wrap gap-2">
      <PhaseBadge phase="relation" />
      <PhaseBadge phase="qualification" />
      <PhaseBadge phase="sexualisation" />
      <PhaseBadge phase="chauffe" />
      <PhaseBadge phase="script" />
      <PhaseBadge phase="unknown" />
    </div>
  );
}
