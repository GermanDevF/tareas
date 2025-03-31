import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const huminizeCount = ({
  count,
  singular,
  plural,
}: {
  count: number;
  singular: string;
  plural: string;
}) => {
  if (count === 0) return `Sin ${plural}`;
  if (count === 1) return `1 ${singular}`;
  if (count > 1 && count < 10) return `${count} ${plural}`;
  if (count >= 10) return `${Math.floor(count / 10)}0+ ${plural}`;
};
