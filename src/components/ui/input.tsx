import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full rounded-lg border bg-transparent text-foreground transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input bg-card focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary",
        glass: "border-border/50 bg-card/60 backdrop-blur-xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary/50",
        filled: "border-transparent bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:bg-secondary/80",
        underline: "rounded-none border-0 border-b-2 border-border bg-transparent focus-visible:border-primary",
      },
      inputSize: {
        default: "h-12 px-4 py-3 text-base",
        sm: "h-10 px-3 py-2 text-sm",
        lg: "h-14 px-5 py-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, inputSize, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, inputSize, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
