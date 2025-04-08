"use client";
import { ChevronRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "./ui";

const decodeUrlString = (str: string): string => decodeURIComponent(str);

function formatSegment(segment: string) {
  // Detecta el formato "nombre__uuid" y extrae solo el nombre
  const match = segment.match(/^(.*?)__([0-9a-fA-F-]{36})$/);
  const formattedSegment = match ? decodeUrlString(match[1]) : segment;

  return formattedSegment
    .replace(/-/g, " ") // Reemplaza guiones con espacios
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitaliza cada palabra
}

interface CustomBreadcrumbsProps {
  pathname?: string;
}

export const CustomBreadcrumbs = ({
  pathname = "/",
}: CustomBreadcrumbsProps) => {
  const pathSegments = pathname.split("/").filter(Boolean);

  // Para móvil, solo mostramos los últimos 2 segmentos
  const mobileSegments =
    pathSegments.length > 2 ? pathSegments.slice(-2) : pathSegments;

  // Función para generar la ruta completa para un segmento
  const getSegmentPath = (segment: string) => {
    const segmentIndex = pathSegments.indexOf(segment);
    return "/" + pathSegments.slice(0, segmentIndex + 1).join("/");
  };

  // Renderiza un segmento de ruta
  const renderSegment = (
    segment: string,
    isLast: boolean,
    isMobile = false
  ) => {
    const href = getSegmentPath(segment);
    const formattedText = formatSegment(segment);
    const truncateClass = isMobile ? "max-w-[120px] truncate" : "";

    if (isLast) {
      return (
        <BreadcrumbPage className={truncateClass}>
          {formattedText}
        </BreadcrumbPage>
      );
    }

    return (
      <>
        <BreadcrumbLink href={href} className={truncateClass}>
          {formattedText}
        </BreadcrumbLink>
        <ChevronRight className="w-4 h-4" />
      </>
    );
  };

  return (
    <Breadcrumb className="py-2 px-2 sm:px-4 max-w-full overflow-hidden">
      <BreadcrumbList className="flex items-center text-sm flex-wrap">
        {/* Versión móvil - solo últimos 2 segmentos */}
        <div className="sm:hidden flex items-center">
          {mobileSegments.map((segment: string, index: number) => (
            <BreadcrumbItem key={getSegmentPath(segment)}>
              {renderSegment(
                segment,
                index === mobileSegments.length - 1,
                true
              )}
            </BreadcrumbItem>
          ))}
        </div>

        {/* Versión desktop - todos los segmentos */}
        <div className="hidden sm:flex items-center flex-wrap">
          {pathSegments.map((segment: string, index: number) => (
            <BreadcrumbItem key={getSegmentPath(segment)}>
              {renderSegment(segment, index === pathSegments.length - 1)}
            </BreadcrumbItem>
          ))}
        </div>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
