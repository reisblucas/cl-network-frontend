import { AxiosError } from 'axios'

/**
 * This function is used to wrap the error message in a toast notification
 * Axios intercept and send only the response.data to VIEW
 */
export function toastDescriptionWrapper(error: unknown) {
  return (error as AxiosError<{ message: string }>).message || 'Come back in this util later :)'
}
