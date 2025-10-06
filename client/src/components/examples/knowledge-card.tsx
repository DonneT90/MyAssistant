import { KnowledgeCard } from "../knowledge-card";

export default function KnowledgeCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
      <KnowledgeCard
        icon="💬"
        title="Phase Relation"
        description="Créer une relation solide pour fidéliser le fan. Plus il est attaché, plus il dépensera facilement."
        onClick={() => console.log("Relation clicked")}
      />
      <KnowledgeCard
        icon="✅"
        title="Phase Qualification"
        description="S'assurer que le client est seul chez lui pour qu'il soit en état émotionnel favorable à l'achat."
        onClick={() => console.log("Qualification clicked")}
      />
      <KnowledgeCard
        icon="🔥"
        title="Phase Sexualisation"
        description="Introduire le sujet sexuel pour exciter le client et créer une connexion plus intime."
        onClick={() => console.log("Sexualisation clicked")}
      />
    </div>
  );
}
