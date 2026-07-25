import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export function GlassCard({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("glass-card p-6", className)} {...props}>
      {children}
    </div>
  );
}
