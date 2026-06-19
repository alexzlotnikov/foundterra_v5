import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-[2px]",
        hero: "inline-flex items-center gap-2 bg-[linear-gradient(135deg,var(--purple)_0%,#9333ea_100%)] text-white border border-transparent rounded-[2px] font-semibold uppercase tracking-[0.08em] shadow-[0_8px_32px_rgba(124,58,237,0.3)] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(124,58,237,0.4)]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-[2px]",
        outline:
          "border border-[rgba(124,58,237,0.4)] bg-transparent hover:bg-[rgba(124,58,237,0.12)] hover:border-[var(--purple-light)] text-[var(--purple-light)] rounded-[2px]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-[2px]",
        ghost: "border border-[rgba(124,58,237,0.4)] text-[var(--purple-light)] hover:bg-[rgba(124,58,237,0.12)] rounded-[2px]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-[2px] px-4",
        lg: "h-11 rounded-[2px] px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
