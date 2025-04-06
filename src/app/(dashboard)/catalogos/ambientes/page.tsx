import { Metadata, Viewport } from "next";
import { getAllAmbientes } from "./actions";
import { AmbienteContent } from "./components/ambiente-content";

export const metadata: Metadata = {
  title: "Ambientes",
  description: "Gestiona los ambientes del sistema",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default async function AmbientePage() {
  const ambientes = await getAllAmbientes();

  return (
    <div className="container py-6">
      <AmbienteContent ambientes={ambientes} />
    </div>
  );
}
