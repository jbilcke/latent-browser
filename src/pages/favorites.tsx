import { App } from '~/types'
import { useOpenTabs, useStoredApps } from '~/hooks'
import { Button } from '~/components'

function Favorites() {
  const [storedApps, setStoredApps] = useStoredApps()
  const [openTabs, setOpenTabs] = useOpenTabs()
  const isLoading = !storedApps || !openTabs

  const handleRemove = (id: string) => {
    setStoredApps((apps) => apps.filter((app) => app.id !== id))
  }

  const handleOpen = (app: App) => {
    console.log(`tab.favorites(${app.id}): handleOpen for`, app)

    const alreadyExists = openTabs.find(({ id }) => id === app.id)
    if (alreadyExists) {
      // select the tab (we only keep one favorite alive at a time)
      setOpenTabs(
        openTabs.map((a) => ({
          ...a,
          isActive: a.id === app.id,
        }))
      )
    } else {
      setOpenTabs(
        openTabs
          .map((a) => ({ ...a, isActive: false }))
          .concat({
            // app properties
            ...app,

            // tab properties
            isActive: true,
            isFavorite: true,
            type: 'content',
            isNew: false,
          })
      )
    }
  }

  return isLoading ? (
    <div className="flex items-center justify-center h-screen w-screen text-gray-800">
      <div className="flex flex-col p-12 rounded-3xl bg-gray-900/10">
        <h1 className="text-3xl mb-4">Loading favorites</h1>
        <p></p>
      </div>
    </div>
  ) : (
    <div className="flex flex-col p-12 font-sans">
      <h3 className="text-4xl font-semibold uppercase text-gray-800 ">
        <span className="font-semibold">{storedApps.length || 0}</span> favorite
        {storedApps.length > 1 ? 's' : ''}
      </h3>
      <div className="flex flex-col w-full">
        {storedApps.map((app) => (
          <div key={app.id} className="flex flex-col py-4 w-full">
            <div className="inline-block">
              <a
                className="text-xl text-blue-900 font-light cursor-pointer hover:underline decoration-2"
                href="#"
                onClick={() => handleOpen(app)}
              >
                <span className=" text-blue-900/60">"</span>
                {app.title}
                <span className=" text-blue-900/60">"</span>
              </a>{' '}
              <span className=" text-gray-700 font-sm">by</span>{' '}
              <span className=" text-gray-700 font-sm font-semibold"> you</span>
              <span className="ml-3">
                <Button onClick={() => handleRemove(app.id)}>Delete</Button>
              </span>
            </div>
            {app.prompt ? (
              <div className="py-2 w-full text-gray-900 font-extralight text-sm">
                <span className="font-normal">Prompt: </span> {app.prompt}
              </div>
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Favorites
