import { useEffect } from 'react'

export const usePreventFastRefreshDev = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      const preventPageRefresh = (e: any) => {
        e.preventDefault()
        const shouldReload = confirm('Confirm full refresh?')
        e.returnValue = shouldReload
        return shouldReload
      }
      window.addEventListener('beforeunload', preventPageRefresh)

      return () =>
        window.removeEventListener('beforeunload', preventPageRefresh)
    }
  }, [])
}
