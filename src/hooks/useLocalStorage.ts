import { useLocalStorage as useLocalStorageMantine } from '@mantine/hooks'

export function useLocalStorage<T>(key: string, defaultValue: T) {
  return useLocalStorageMantine<T>({
    key,
    defaultValue,
  })
}
