import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProyectoById } from "../../actions";
import { FormEditarProyecto } from "./form-editar";

interface EditProjectPageProps {
  params: {
    id: string;
  };
}

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const proyecto = await getProyectoById(params.id);

  if (!proyecto) {
    notFound();
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Editar Proyecto</h1>
          <p className="text-muted-foreground">
            Modifica los detalles del proyecto
          </p>
        </div>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/catalogos/proyectos">
            <XIcon className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalles del Proyecto</CardTitle>
        </CardHeader>
        <CardContent>
          <FormEditarProyecto proyecto={proyecto} />
        </CardContent>
      </Card>
    </div>
  );
}
