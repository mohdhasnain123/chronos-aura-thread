import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cyberButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-orbitron relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-glow cyber-glow",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-primary/50 bg-transparent hover:bg-primary/10 hover:text-primary hover-hologram",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-glow cyber-glow",
        ghost: "hover:bg-accent hover:text-accent-foreground hover-hologram",
        link: "text-primary underline-offset-4 hover:underline",
        neural: "bg-neural-pulse text-foreground hover:bg-neural-pulse/80 neural-pulse",
        hologram: "hologram hover:bg-hologram-base/20 border-glow",
        cyber: "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:from-primary-glow hover:to-accent-glow cyber-glow",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-12 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface CyberButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof cyberButtonVariants> {
  asChild?: boolean
}

const CyberButton = React.forwardRef<HTMLButtonElement, CyberButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(cyberButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
        {/* Neural scan line effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </Comp>
    )
  }
)
CyberButton.displayName = "CyberButton"

export { CyberButton, cyberButtonVariants }