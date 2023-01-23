import { useEffect, useState } from 'react'
import { ComponentTree } from '../prompts'
import { useSettings } from './useSettings'

export const _useLatentComponent = (spec?: string) => {
  const [tree, setTree] = useState<ComponentTree>()
  const [settings] = useSettings()
  const openAIKey = settings?.openAIKey
  const openAIModel = settings?.openAIModel

  useEffect(() => {
    const fn = async () => {
      if (!openAIKey || !openAIModel || !spec) {
        // cannot generate the image yet
        return
      }
      console.log(
        `useLatentComponent: generating latent component for spec ${spec}`
      )
      const response = await fetch(
        `/api/component?spec=${encodeURIComponent(
          spec
        )}&model=${encodeURIComponent(openAIModel)}&apiKey=${encodeURIComponent(
          openAIKey
        )}`
      )

      const result = (await response.json()) as any as ComponentTree

      setTree(result)
    }
    fn()
  }, [spec, openAIKey, openAIModel])

  return tree
}
