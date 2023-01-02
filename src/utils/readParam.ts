export const readParam = <T>(name: string, defaultValue: T) => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search)
    const param = params.get(name)
    if (typeof param === 'string') {
      const cleanParam = param.trim()
      try {
        return JSON.parse(cleanParam) as unknown as T
      } catch (err) {
        return cleanParam as unknown as T
      }
    }
  }

  return defaultValue
}
