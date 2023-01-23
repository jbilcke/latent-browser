import { useEffect, useState } from 'react'
import { create } from 'zustand'

interface LatentComponentStore {
  components: string[]
}

const useLatentComponentStore = create<LatentComponentStore>((set) => ({
  components: [],
  add: (newOne: string) =>
    set(({ components }) => ({ components: components.concat(newOne) })),
  clear: () => set({ components: [] }),
}))

// this is used to stack pending latent components
export const useLatentComponent = (spec?: string) => {
  const s = useLatentComponentStore()
}
