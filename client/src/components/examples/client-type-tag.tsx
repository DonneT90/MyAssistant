import { ClientTypeTag } from "../client-type-tag";

export default function ClientTypeTagExample() {
  return (
    <div className="flex flex-wrap gap-2">
      <ClientTypeTag type="nouveau" />
      <ClientTypeTag type="ancien" />
      <ClientTypeTag type="timewaster" />
      <ClientTypeTag type="spender" />
      <ClientTypeTag type="unknown" />
    </div>
  );
}
