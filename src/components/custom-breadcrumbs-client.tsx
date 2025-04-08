"use client";

import { usePathname } from "next/navigation";
import { CustomBreadcrumbs } from "./custom-breadcrumbs";

export const CustomBreadcrumbsClient = () => {
  const pathname = usePathname();

  return <CustomBreadcrumbs pathname={pathname} />;
};
