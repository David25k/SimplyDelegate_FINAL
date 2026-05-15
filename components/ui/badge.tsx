import * as React from "react";

import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-[8px] border border-black/10 bg-white/45 px-3 py-1 text-xs font-medium text-[#4e515b]",
        className,
      )}
      {...props}
    />
  );
}
