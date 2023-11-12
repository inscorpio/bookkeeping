import * as React from "react"

import { cn } from "~/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

  // TODO: handle the focus-visible style when focus
const InputProvider = React.forwardRef<HTMLLabelElement, React.HTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => {
    return (
      <label
      className={cn('flex-y-center space-x-2 h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors', className)}
        ref={ref}
        {...props}
      />
    )
  },
)
InputProvider.displayName = 'InputWrapper'

// TODO: change the text color when focus
const Prefix = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => {
    return (
      <span
      className={cn('text-stone-500', className)}
        ref={ref}
        {...props}
      />
    )
  },
)
Prefix.displayName = 'Prefix'

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "w-full h-full file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input, InputProvider, Prefix }
