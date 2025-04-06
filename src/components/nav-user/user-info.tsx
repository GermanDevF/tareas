"use client";

interface UserInfoProps {
  name?: string;
  email?: string;
  className?: string;
}

export function UserInfo({ name, email, className }: UserInfoProps) {
  return (
    <div className={`grid flex-1 text-left text-sm leading-tight ${className}`}>
      <span className="truncate font-medium">{name}</span>
      <span className="truncate text-xs">{email}</span>
    </div>
  );
}
