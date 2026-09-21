import * as React from "react"
import { cn } from "cn"

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "text-sm font-medium leading-none text-foreground/90 aria-disabled:pointer-events-none aria-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }