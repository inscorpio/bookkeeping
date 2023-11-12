import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ZodIssue } from 'zod'
import { toast } from '~/components/ui/use-toast'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function showZodErrorToasts(errors?: ZodIssue[]) {
  return new Promise((resolve) => {
    if (errors) {
      errors.forEach(({ message: title }) => toast({ title }))
    }
    else {
      resolve(true)
    }
  })
}
