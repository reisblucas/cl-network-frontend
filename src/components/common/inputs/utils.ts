import { type FieldErrors, type FieldValues } from 'react-hook-form'

export function isValidForm<T extends FieldValues>(errors: FieldErrors<T>): boolean {
  return Boolean(Object.values(errors).some((error) => error?.message))
}
