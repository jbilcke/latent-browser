import { useEffect, useState } from 'react'

export const useParam = (name: string, defaultValue = '') => {
  const [param, setParam] = useState(defaultValue)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setParam(params.get(name).trim())
  }, [])

  return param
}
