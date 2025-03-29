import { Loader } from "lucide-react";

export function LoadingGroups() {
  return (
    <div className="flex items-center justify-center h-full gap-2">
      <Loader className="animate-spin ml-2" />
      <p>Cargando grupos...</p>
    </div>
  );
}
