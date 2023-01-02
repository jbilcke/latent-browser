import { useStoredApps } from '../hooks/useStoredApps'
import { Button } from '../components/buttons/Button'
import { emitToParent } from '../utils/event'
import { App } from '../types'

function Favorites() {
  const stored = useStoredApps()
  const storedApps = stored[0] // || []
  const setStoredApps = stored[1]

  console.log('storedApps:', JSON.stringify(storedApps))

  const handleRemove = (id: string) => {
    setStoredApps((apps) => apps.filter((app) => app.id !== id))
  }

  const handleOpen = (app: App) => {
    emitToParent('restore', {
      app,
    })
  }

  return (
    <div className="flex flex-col p-12 font-sans">
      <h3 className="text-3xl font-semibold uppercase text-gray-800 ">
        <span className="font-semibold">{storedApps?.length || 0}</span>{' '}
        favorite
        {storedApps?.length > 1 ? 's' : ''}
      </h3>
      <div className="flex flex-col w-full">
        {storedApps?.map((app) => (
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
