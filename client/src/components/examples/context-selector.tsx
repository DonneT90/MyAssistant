import { useState } from "react";
import { ContextSelector } from "../context-selector";

export default function ContextSelectorExample() {
  const [phase, setPhase] = useState("unknown");
  const [clientType, setClientType] = useState("unknown");

  return (
    <div className="max-w-2xl">
      <ContextSelector
        phase={phase}
        clientType={clientType}
        onPhaseChange={setPhase}
        onClientTypeChange={setClientType}
      />
    </div>
  );
}
