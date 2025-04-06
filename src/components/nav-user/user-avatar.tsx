"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  name?: string;
  image?: string;
  className?: string;
}

export function UserAvatar({ name, image, className }: UserAvatarProps) {
  return (
    <Avatar className={`rounded-lg ${className}`}>
      <AvatarImage src={image} alt={name} />
      <AvatarFallback className="rounded-lg">
        {name?.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
