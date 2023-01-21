import { lazy, Suspense, useEffect, useState } from 'react'
import Head from 'next/head'
import { v4 as uuidv4 } from 'uuid'
import Icon from 'react-material-symbols/rounded'

import { useStoredApps, useOpenTabs, useSettings } from 'hooks'
import { IconButton, SearchInput, SpeechInput } from 'components'

const Tabs = lazy(() => import('../components/browser-ui/tabs/Tabs'))

function Index() {
  const [query, setQuery] = useState('')
  const [settings] = useSettings()
  const [storedApps, setStoredApps] = useStoredApps()
  const [openTabs, setOpenTabs] = useOpenTabs()
  const isLoading = !storedApps || !openTabs

  const activeApp = openTabs?.find((a) => a.isActive)
  const activeTabId = activeApp?.id
  const activeIsFavorite = activeApp?.isFavorite

  const handleGenerate = () => {
    // open the link in current tab

    console.log('handleGenerate', query)
    setOpenTabs(
      // note: we cannot use the function to update the state here

      openTabs
        // like in a real browser, we need to remove the existing tab,
        // otherwise the /content will have internally the old ID
        // reformulated: we should NEVER change the ID of an existing tab!
        .filter((a) => a.id !== activeTabId)
        .concat({
          // app properties
          id: uuidv4(),
          title: query.length > 20 ? `${query.slice(0, 20)}..` : query,
          prompt: query,

          // tab properties
          isActive: true,
          isFavorite: false,
          type: 'content',
          isNew: true,
        })
    )
  }

  const handleSettings = () => {
    const alreadyOpen = openTabs.find((a) => a.type === 'settings')
    setOpenTabs(
      alreadyOpen
        ? openTabs.map((a) => ({ ...a, isActive: a.type === 'settings' }))
        : openTabs
            .map((app) => ({ ...app, isActive: false }))
            .concat({
              // app properties
              id: uuidv4(),
              title: 'Settings',

              // tab properties
              isActive: true,
              isFavorite: false,
              type: 'settings',
              isNew: true,
            })
    )
  }

  useEffect(() => {
    // if settings are ready but no OpenAI key is defined -> we should the config panel
    if (settings && !settings.openAIKey) {
      handleSettings()
    }
  }, [settings?.openAIKey])

  const handleFavorites = () => {
    const alreadyOpen = openTabs.find((a) => a.type === 'favorites')

    setOpenTabs(
      alreadyOpen
        ? openTabs.map((a) => ({ ...a, isActive: a.type === 'favorites' }))
        : openTabs
            .map((app) => ({ ...app, isActive: false }))
            .concat({
              // app properties
              id: uuidv4(),
              title: 'Favorites',

              // tab properties
              isActive: true,
              isFavorite: false,
              type: 'favorites',
              isNew: true,
            })
    )
  }

  // update the search bar when a tab changes
  useEffect(() => {
    if (activeApp?.id) {
      setQuery(activeApp.prompt)
    }
  }, [activeApp])

  const handleToggleFavorite = () => {
    console.log('handleToggleFavorite (switching the state in the default tab)')
    setStoredApps(
      activeIsFavorite
        ? // if the tab is already a favorite, we remove it from the favorites
          storedApps.filter(({ id }) => id !== activeTabId)
        : // otherwise we add it to the favorites
          storedApps.concat(JSON.parse(JSON.stringify(activeApp)))
    )

    // toggle the tab state
    setOpenTabs((openTabs) =>
      openTabs.map((a) => ({
        ...a,
        isFavorite: a.id === activeTabId ? !activeIsFavorite : a.isFavorite,
      }))
    )
  }

  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        ></link>
        <link rel="manifest" href="/site.webmanifest"></link>
      </Head>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen w-screen text-gray-800">
          <div className="flex flex-col p-12 rounded-3xl bg-gray-900/10">
            <h1 className="text-3xl mb-4">Loading index</h1>
            <p></p>
          </div>
        </div>
      ) : (
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
            <div className="absolute top-[40px] flex items-center justify-center space-x-2 w-full px-4 h-[40px] bg-toolbar-fg">
              <SpeechInput
                language={settings.speechToTextLanguage}
                onChange={setQuery}
                onSubmit={handleGenerate}
              />
              <SearchInput
                onChange={setQuery}
                onSubmit={handleGenerate}
                placeholder="Type a prompt or an app address (coming soon)"
                value={query}
              />
              {activeApp
                ? activeApp.type === 'content' &&
                  activeApp.tree && (
                    <IconButton onClick={handleToggleFavorite}>
                      <Icon
                        icon={
                          activeApp.isFavorite
                            ? 'bookmark_remove'
                            : 'bookmark_add'
                        }
                        size={24}
                        weight={300}
                        fill={activeApp.isFavorite}
                        color="#414144"
                      />
                    </IconButton>
                  )
                : null}
              <IconButton onClick={handleFavorites}>
                <Icon icon="bookmarks" size={24} weight={300} color="#414144" />
              </IconButton>
              <IconButton onClick={handleSettings}>
                <Icon icon="settings" size={24} weight={300} color="#414144" />
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
            <Suspense fallback={<p></p>}>
              {' '}
              <Tabs />
            </Suspense>
          </div>
        </div>
      )}
    </>
  )
}

export default Index
