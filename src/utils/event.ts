export const emitToParent = (name: string, data?: Record<string, any>) => {
  window.parent.document.dispatchEvent(
    new CustomEvent('renderer', {
      detail: {
        name,
        ...data,
      },
    })
  )
}
