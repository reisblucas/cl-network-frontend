import { useEffect } from 'react'
import { useNavigate, type NavigateOptions } from 'react-router'

export let GlobalNavigate: ((path: string, options?: NavigateOptions) => void) | null = null

/**
 * Esse helper serve para evitar que o app builde novamente
 *
 * Se usar o window.location.href diretamente após receber 401 no AXIOS o app terá o comportamento de build/rebuild
 * - como se fosse um refresh(F5);
 * - ou quando entramos na página pela primeira vez.
 */
export function useGlobalNavigate() {
  const navigate = useNavigate()

  useEffect(() => {
    return () => {
      if (GlobalNavigate === navigate) {
        GlobalNavigate = null
      }
    }
  }, [navigate])

  return
}
