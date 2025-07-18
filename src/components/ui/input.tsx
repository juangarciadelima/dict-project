import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "font-title font-bold selection:bg-details dark:text-white dark:selection:text-white selection:text-primary-foreground dark:bg-input/30 flex h-12 w-full min-w-0 rounded-lg bg-transparent px-3 py-2 pl-6 text-2xl transition-[color,box-shadow] outline-none  disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:ring-2 focus-visible:ring-details pl-4 pr-12",
        "aria-invalid:ring-destructive dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-gray-400/15 aria-invalid:ring-2",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
