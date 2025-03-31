"use client";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
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

export const CustomBreadcrumbs = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const href = "/" + pathSegments.slice(0, index + 1).join("/");

          return (
            <div key={href} className="flex items-center">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{formatSegment(segment)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>
                    {formatSegment(segment)}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
