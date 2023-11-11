import React from 'react'
import { cn } from '~/utils'

const Container = React.forwardRef<HTMLInputElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => {
    return (
      <section
        className={cn('flex flex-col w-full h-full', className)}
        ref={ref}
        {...props}
      />
    )
  },
)
Container.displayName = 'Container'

const Header = React.forwardRef<HTMLInputElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => {
    return (
      <header
        className={cn('flex-y-center p-4', className)}
        ref={ref}
        {...props}
      />
    )
  },
)
Header.displayName = 'Header'

const Main = React.forwardRef<HTMLInputElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => {
    return (
      <main
        className={cn('flex-1 px-4 overflow-y-scroll', className)}
        ref={ref}
        {...props}
      />
    )
  },
)
Main.displayName = 'Main'

const Footer = React.forwardRef<HTMLInputElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => {
    return (
      <footer
        className={className}
        ref={ref}
        {...props}
      />
    )
  },
)
Footer.displayName = 'Footer'

export { Container, Footer, Header, Main }
