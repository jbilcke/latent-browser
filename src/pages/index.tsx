import { useEffect, useRef, useState } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { v4 as uuidv4 } from 'uuid'

import Icon from 'react-material-symbols/rounded'

import { downloadHtmlFile } from '../engine/exporters/html'
import { SearchInput } from '../components/inputs/SearchInput'
import { Button } from '../components/buttons/Button'
import { IconButton } from '../components/buttons/IconButton'
import { Tabs } from '../components/tabs/Tabs'
import { useStoredApps } from '../hooks/useStoredApps'
import { App, Link } from '../types'

function Index() {
  const [query, setQuery] = useState('')

  const [storedApps, setStoredApps] = useStoredApps()
  const [activeApps, setActiveApps] = useState<App[]>([
    {
      id: uuidv4(),
      type: 'search',
      title: '☊ Latent Search',
      subtitle: '',
      prompt: '',
      tasks: {},
      html: '',
      script: '',
      data: {},
    },
  ])

  const [currentId, setCurrentId] = useState<string>(
    activeApps.length ? activeApps[0].id : ''
  )
  const currentApp = activeApps.find((a) => a.id === currentId)
  const currentIsAFavorite = storedApps.some((a) => a.id === currentId)

  console.log('storedApps:', storedApps)

  const onAddTab = () => {
    const id = uuidv4()
    setActiveApps((apps) =>
      apps.concat({
        id,
        type: 'search',
        title: '☊ Latent Search',
        subtitle: '',
        prompt: '',
        tasks: {},
        html: '',
        script: '',
        data: {},
      })
    )
    setCurrentId(id)
  }

  const onRemoveTab = (tabId?: string) => {
    setActiveApps((apps) => apps.filter(({ id }) => id !== tabId))
    setCurrentId(activeApps.find(({ id }) => id !== tabId)?.id)
  }

  const onSelectTab = (tabId?: string) => {
    setCurrentId(tabId)
  }

  useEffect(() => {
    const tab = activeApps.find(({ id }) => id === currentId)
    if (!tab) {
      return
    }
    console.log('selected tab', tab)
    setQuery(tab.prompt)
  }, [currentId])

  useEffect(() => {
    const onRenderer = ({
      detail: msg,
    }: CustomEvent<{
      name: string
      // used when an app is ready
      app?: App

      // used to open links
      link?: Link
    }>) => {
      console.log('received a message from renderer:', msg)
      if (msg.name === 'open' && msg.link) {
        // open the link in a new tab
        const id = uuidv4()
        setActiveApps((apps) =>
          apps.concat({
            id,
            type: 'content',
            title: msg.link.title,
            subtitle: msg.link.title,
            prompt: msg.link.alt,
            tasks: {},
            html: '',
            script: '',
            data: {},
          })
        )
        setCurrentId(id)
      } else if (msg.name === 'restore' && msg.app) {
        console.log('requested to rehydrate app', msg.app)
        // open the link in a new tab
        const id = uuidv4()
        setActiveApps((apps) =>
          apps.concat({
            ...msg.app,
            id, // important: we create a new id!
          })
        )
        setCurrentId(id)
      } else if (msg.name === 'update' && msg.app) {
        console.log('requested to update the app to:', msg.app)
        setActiveApps((apps) =>
          apps.map((a) =>
            a.id === msg.app.id
              ? {
                  ...a,
                  ...msg.app,
                }
              : a
          )
        )

        // if the app is also a stored app, we update the internal data as well
        setStoredApps((apps) => {
          const alreadyExists = apps.some(({ id }) => id === msg.app.id)

          if (alreadyExists) {
            console.log('the update app is also a stored app!')
            // we only overwrite the data
            return apps.map((a) =>
              a.id === msg.app.id
                ? {
                    ...a,
                    data: msg.app.data,
                  }
                : a
            )
          }
          return apps
        })
      }
    }

    window.document.addEventListener('renderer', onRenderer, false)

    return () => {
      window.document.removeEventListener('renderer', onRenderer)
    }
  }, [])

  const handleFix = () => {
    console.log('searching for iframe ', currentId)
    const iframe = document.getElementById(
      currentId
    ) as unknown as HTMLIFrameElement
    console.log('iframe: ', iframe)
    if (!iframe) {
      return
    }

    console.log(
      'sending event to the iframe:',
      new CustomEvent('host', {
        detail: {
          name: 'rebuild',
        },
      })
    )

    iframe.contentWindow.dispatchEvent(
      new CustomEvent('host', {
        detail: {
          name: 'rebuild',
        },
      })
    )

    iframe.contentWindow.postMessage({ name: 'rebuild' })
    iframe.contentWindow.postMessage('rebuild')
  }

  const handleGenerate = () => {
    // open the link in a new tab
    const id = uuidv4()
    setActiveApps((apps) =>
      apps.concat({
        id,
        type: 'content',
        title: query.length > 20 ? `${query.slice(0, 20)}..` : query,
        subtitle: '',
        prompt: query,
        tasks: {},
        html: '',
        script: '',
        data: {},
      })
    )
    setCurrentId(id)
  }

  const handleFavorites = () => {
    const id = uuidv4()
    setActiveApps((apps) =>
      apps.concat({
        id,
        type: 'favorites',
        title: 'Favorites',
        subtitle: '',
        prompt: '',
        tasks: {},
        html: '',
        script: '',
        data: {},
      })
    )
    setCurrentId(id)
  }

  const handleToggleFavorite = () => {
    const activeApp = activeApps.find(({ id }) => id === currentId)
    const storedApp = storedApps.find(({ id }) => id === currentId)
    console.log('handleToggleFavorite')

    console.log('activeApps:', activeApp)
    console.log('storedApp:', storedApp)

    console.log('found an app to add to the favorites:', activeApp)

    setStoredApps((apps) => {
      // take a new snapshot of the app
      return storedApp
        ? apps.filter(({ id }) => id !== currentId)
        : apps.concat(JSON.parse(JSON.stringify(activeApp)))
    })
  }

  return (
    <div className="rounded-xl overflow-hidden select-none">
      {/*
      duration && (
        <div className="flex w-screen h-screen items-center justify-center">
          <CountdownCircleTimer
            isPlaying
            duration={duration}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
          >
            {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer>
        </div>
      )
      */}

      <div className="flex flex-col w-screen h-screen bg-toolbar-bg overflow-hidden">
        <div className="absolute top-[40px] flex items-center justify-center space-x-4 w-full px-4 h-[40px] bg-toolbar-fg">
          {/*<Icon icon="refresh" size={24} fill grade={-25} color="#212124" />*/}
          <SearchInput
            onChange={setQuery}
            onSubmit={handleGenerate}
            placeholder="Type a prompt or an app address (coming soon)"
            value={query}
          />
          {currentApp.type === 'content' && currentApp.html && (
            <IconButton onClick={handleToggleFavorite}>
              <Icon
                icon={currentIsAFavorite ? 'bookmark_remove' : 'bookmark_add'}
                size={24}
                weight={300}
                fill={!!currentIsAFavorite}
                color="#414144"
              />
            </IconButton>
          )}
          <IconButton onClick={handleFavorites}>
            <Icon icon="bookmarks" size={24} weight={300} color="#414144" />
          </IconButton>
          {/*
          !currentTabIsASearchTab && (
            <Button onClick={handleFix}>
              {
                // or: Heal, Repair 
              }
              Rebuild 💊
            </Button>
          )
          */}
          {/*
          <Button onClick={onExport}>
            {
              // or: Save, Keep, Export, Pick, Preserve
            }
            Save 🍒
          </Button>
          */}
        </div>

        <Tabs
          activeTab={currentApp.id}
          onAdd={onAddTab}
          onRemove={onRemoveTab}
          onSelect={onSelectTab}
          tabs={activeApps}
        />
      </div>
    </div>
  )
}

export default Index
