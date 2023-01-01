import { useEffect, useState } from 'react'

export const useParam = (name: string, defaultValue = '') => {
  const [param, setParam] = useState(defaultValue)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const param = params.get(name)
    if (typeof param === 'string') {
      setParam(param.trim())
    }
  }, [])

  return param
}
