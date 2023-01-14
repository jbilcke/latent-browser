import { useEffect } from 'react'
import setupIndexedDB from 'use-indexeddb'
import { IndexedDBConfig } from 'use-indexeddb/dist/interfaces'

let alreadySetup = {}

export const useSetupIndexedDB = (config: IndexedDBConfig) => {
  useEffect(() => {
    const id = config.databaseName
    if (typeof alreadySetup[id] !== 'boolean') {
      console.log(`useSetupIndexedDB: preparing database ${id}`)
      setupIndexedDB(config)
        .then(() => {
          console.log(`useSetupIndexedDB: ${id} is ready!`)
          alreadySetup[id] = true
        })
        .catch((e) => {
          console.error(`useSetupIndexedDB: failed to prepare ${id}`, e)
          alreadySetup[id] = false
        })
    }
  }, [])
}
