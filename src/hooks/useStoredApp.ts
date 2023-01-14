import { useEffect, useState } from 'react'
import setupIndexedDB, { useIndexedDBStore } from 'use-indexeddb'
import { IndexedDBConfig, IndexedDBStore } from 'use-indexeddb/dist/interfaces'
import { useIndexedDB } from './useIndexedDB'
import { useInterval } from './useInterval'

const simpleStore = (name: string): IndexedDBStore => ({
  name,
  id: { keyPath: 'id', autoIncrement: true },
  indices: [],
})

/*
to delete all databases:
const dbs = await window.indexedDB.databases()
dbs.forEach(db => { window.indexedDB.deleteDatabase(db.name) })
*/
export const useStoredApp = (id: string) => {
  const config: IndexedDBConfig = {
    databaseName: `app-${id}`,
    version: 1,
    stores: [
      // used to store JSON blobs of entities managed by an app
      simpleStore('entities'),

      // used to store base64 blobs of images
      simpleStore('images'),
    ],
  }

  const entities = useIndexedDB(config, 'entities')
  const images = useIndexedDB(config, 'images')

  return {
    entities,
    images,
  }
}
