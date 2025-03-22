import React from "react";
import * as LucideIcons from "lucide-react";

interface IconProps {
  iconName: string;
  className?: string; // Prop opcional para clases CSS
}

const Icon: React.FC<IconProps> = ({ iconName, className }) => {
  const IconComponent =
    (
      LucideIcons as unknown as {
        [key: string]: React.ComponentType<{ className?: string }>;
      }
    )[iconName] || null;

  if (!IconComponent) {
    return null; // Devuelve null si no se encuentra el icono
  }

  return <IconComponent className={className} />;
};

export default Icon;
