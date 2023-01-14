import { useLocalStorage } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { useIndexedDBStore } from 'use-indexeddb'
import { IndexedDBConfig } from 'use-indexeddb/dist/interfaces'
import { useSetupIndexedDB } from './useSetupIndexedDB'

export const useIndexedDB = <T>(
  config: IndexedDBConfig,
  id: string,
  subscribe?: boolean // if we should subscribe to changes or not
) => {
  const [store, setStore] = useState<ReturnType<typeof useIndexedDBStore<T>>>()

  // local storage used to watch iterations (write changes) on the indexedDB
  const [changes, setChanges] = useLocalStorage<number>({
    key: `${config.databaseName}-${id}-changes-1`,
    defaultValue: 0,
  })

  useSetupIndexedDB(config)
  const originalStore = useIndexedDBStore<T>(id)

  useEffect(() => {
    const spy = {
      apply(target, thisArg, argArray) {
        const result = Reflect.apply(target, thisArg, argArray)
        // we touch the iteration counter, which will creates a cascade effect,
        // it will alert anyone using the indexedDB that something changed
        setChanges((c) => c + 1)
        return result
      },
    }

    const spies = {
      add: new Proxy(originalStore.add, spy),
      update: new Proxy(originalStore.update, spy),
      deleteByID: new Proxy(originalStore.deleteByID, spy),
      deleteAll: new Proxy(originalStore.deleteAll, spy),
    }

    setStore(
      subscribe
        ? {
            ...originalStore,
            ...spies,
          }
        : originalStore
    )
  }, [id, originalStore])

  return { store, changes }
}
