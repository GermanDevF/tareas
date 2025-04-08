"use client";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  FileCode2,
  Github,
  Info,
  LayoutDashboard,
  Link2,
  Mail,
  MapPin,
  ScrollText,
  User2,
  Users2,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface TaskDetailProps {
  task: {
    id: string;
    title: string;
    content?: string | null;
    branch?: string | null;
    linkPr?: string | null;
    claveZoho?: string | null;
    startDate?: Date | null;
    endDate?: Date | null;
    devDate?: Date | null;
    prodDate?: Date | null;
    validado: boolean | null;
    createdAt: Date;
    updatedAt: Date;
    type?: { name: string; color: string } | null;
    estado?: { name: string } | null;
    lideres: { user: { name: string | null; email: string } };
    programador: { user: { name: string | null; email: string } };
    ambiente: { name: string };
    proyecto?: { name: string } | null;
    user: { name: string | null; email: string };
  };
}

const InfoItem = ({
  icon: Icon,
  label,
  value,
  className = "",
}: {
  icon: any;
  label: string;
  value: React.ReactNode;
  className?: string;
}) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <Icon className="size-4 text-muted-foreground flex-shrink-0" />
    <span className="font-medium min-w-24">{label}:</span>
    <span className="text-muted-foreground">{value}</span>
  </div>
);

export function TaskDetail({ task }: TaskDetailProps) {
  const router = useRouter();

  return (
    <div className="w-full h-full">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 bg-background p-4 rounded-lg shadow-sm">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="rounded-full">
            <ArrowLeft className="size-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              {task.title}
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  task.validado === true
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-rose-100 text-rose-800"
                }`}>
                {task.validado === true ? (
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="size-4" />
                    Validado
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <XCircle className="size-4" />
                    No Validado
                  </span>
                )}
              </span>
            </h1>
            <p className="text-muted-foreground mt-1">
              Creado el{" "}
              {format(new Date(task.createdAt), "dd 'de' MMMM 'de' yyyy", {
                locale: es,
              })}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna 1: Información General */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="size-5" />
                Información General
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <InfoItem
                icon={LayoutDashboard}
                label="Estado"
                value={task.estado?.name || "-"}
              />
              {task.type && (
                <InfoItem
                  icon={FileCode2}
                  label="Tipo"
                  value={
                    <span className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: task.type.color }}
                      />
                      {task.type.name}
                    </span>
                  }
                />
              )}
              <InfoItem
                icon={MapPin}
                label="Ambiente"
                value={task.ambiente.name}
              />
              <InfoItem
                icon={ScrollText}
                label="Proyecto"
                value={task.proyecto?.name || "-"}
              />
              <InfoItem
                icon={Link2}
                label="Clave Zoho"
                value={task.claveZoho || "-"}
              />
            </CardContent>
          </Card>

          {/* Columna 2: Desarrollo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code2 className="size-5" />
                Desarrollo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <InfoItem
                icon={FileCode2}
                label="Branch"
                value={task.branch || "-"}
              />
              <InfoItem
                icon={Github}
                label="Pull Request"
                value={
                  task.linkPr ? (
                    <Link
                      href={task.linkPr}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-500 hover:text-blue-600">
                      <Github className="size-4" />
                      Ver PR
                    </Link>
                  ) : (
                    "-"
                  )
                }
              />
              <div className="pt-4">
                <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <ScrollText className="size-4" />
                  Descripción
                </h3>
                <p className="text-muted-foreground bg-muted/50 p-3 rounded-lg">
                  {task.content || "Sin descripción"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Columna 3: Responsables y Fechas */}
          <div className="space-y-6">
            {/* Responsables */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users2 className="size-5" />
                  Responsables
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <InfoItem
                  icon={User2}
                  label="Líder"
                  value={
                    <Link
                      href={`mailto:${task.lideres.user.email}`}
                      className="flex items-center gap-1 hover:text-blue-500">
                      {task.lideres.user.name || "Sin nombre"}
                      <Mail className="size-3" />
                    </Link>
                  }
                />
                <InfoItem
                  icon={User2}
                  label="Programador"
                  value={
                    <Link
                      href={`mailto:${task.programador.user.email}`}
                      className="flex items-center gap-1 hover:text-blue-500">
                      {task.programador.user.name || "Sin nombre"}
                      <Mail className="size-3" />
                    </Link>
                  }
                />
                <InfoItem
                  icon={User2}
                  label="Creador"
                  value={
                    <Link
                      href={`mailto:${task.user.email}`}
                      className="flex items-center gap-1 hover:text-blue-500">
                      {task.user.name || "Sin nombre"}
                      <Mail className="size-3" />
                    </Link>
                  }
                />
              </CardContent>
            </Card>

            {/* Fechas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="size-5" />
                  Fechas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <InfoItem
                  icon={Clock}
                  label="Inicio"
                  value={
                    task.startDate
                      ? format(new Date(task.startDate), "dd/MM/yyyy", {
                          locale: es,
                        })
                      : "-"
                  }
                />
                <InfoItem
                  icon={Clock}
                  label="Entrega"
                  value={
                    task.endDate
                      ? format(new Date(task.endDate), "dd/MM/yyyy", {
                          locale: es,
                        })
                      : "-"
                  }
                />
                <InfoItem
                  icon={Clock}
                  label="Desarrollo"
                  value={
                    task.devDate
                      ? format(new Date(task.devDate), "dd/MM/yyyy", {
                          locale: es,
                        })
                      : "-"
                  }
                />
                <InfoItem
                  icon={Clock}
                  label="Producción"
                  value={
                    task.prodDate
                      ? format(new Date(task.prodDate), "dd/MM/yyyy", {
                          locale: es,
                        })
                      : "-"
                  }
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
