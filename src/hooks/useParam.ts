import { useEffect, useState } from 'react'

export const useParam = <T>(name: string, defaultValue: T) => {
  const [param, setParam] = useState<T>(defaultValue)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const param = params.get(name)
    if (typeof param === 'string') {
      const cleanParam = param.trim()
      try {
        setParam(JSON.parse(cleanParam) as unknown as T)
      } catch (err) {
        setParam(cleanParam as unknown as T)
      }
    }
  }, [])

  return param
}
