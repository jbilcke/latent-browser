import { useEffect, useRef, useState } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { v4 as uuidv4 } from 'uuid'

import Icon from 'react-material-symbols/rounded'

import { downloadHtmlFile } from '../engine/exporters/html'
import { SearchInput } from '../components/inputs/SearchInput'
import { Button } from '../components/buttons/Button'
import { PromptTab, Tabs } from '../components/tabs/Tabs'

function App() {
  const [html, setHtml] = useState('')
  const [query, setQuery] = useState('')
  const [tabs, setTabs] = useState<PromptTab[]>([
    {
      id: uuidv4(),
      type: 'search',
      title: '☊ Latent Search',
      prompt: '',
    },
  ])
  const [current, setCurrent] = useState<string>(tabs.length ? tabs[0].id : '')
  const currentTabIsASearchTab = tabs.some(
    (tab) => tab.id === current && tab.type === 'search'
  )

  const onExport = () => {
    console.log('html to download:', html)
    downloadHtmlFile(html)
  }

  const onAdd = () => {
    const id = uuidv4()
    setTabs((tabs) =>
      tabs.concat({
        id,
        type: 'search',
        title: '☊ Latent Search',
        prompt: '',
      })
    )
    setCurrent(id)
  }

  const onRemove = (tabId?: string) => {
    setTabs((tabs) => tabs.filter(({ id }) => id !== tabId))
    setCurrent(tabs.find(({ id }) => id !== tabId)?.id)
  }

  const onSelect = (tabId?: string) => {
    setCurrent(tabId)
  }

  useEffect(() => {
    const tab = tabs.find(({ id }) => id === current)
    if (!tab) {
      return
    }
    console.log('selected tab', tab)
    setQuery(tab.prompt)
  }, [current])

  useEffect(() => {
    const onRenderer = ({
      detail: msg,
    }: CustomEvent<{
      name: string
      tab?: string
      html?: string
      results?: string
      title?: string
      prompt?: string
    }>) => {
      console.log('received a message from renderer:', msg)
      if (msg.name === 'failedQueryModel') {
        /*
        {
          "error": {
            "message": "That model is currently overloaded with other requests. You can retry your request, or contact us through our help center at help.openai.com if the error persists. (Please include the request ID 6878761e3c8efc809980dd857955cbc0 in your message.)",
            "type": "server_error",
            "param": null,
            "code": null
          }
        }
        */
        setHtml('<p>OpenAI failure (503 error)</p>')
      } else if (msg.name === 'beforeRender') {
        console.log('setting html to:', msg.html)
        if (msg.html) {
          setHtml(msg.html)
        }
      } else if (msg.results) {
      } else if (msg.name === 'open' && msg.prompt) {
        // open the link in the same tab
        /*
        setTabs((tabs) =>
          tabs.map((tab) =>
            tab.id === msg.tab
              ? {
                  ...tab,
                  type: 'content',
                  title: msg.title,
                  prompt: msg.prompt,
                }
              : tab
          )
        )
        */

        // open the link in a new tab
        const id = uuidv4()
        setTabs((tabs) =>
          tabs.concat({
            id,
            type: 'content',
            title: msg.title,
            prompt: msg.prompt,
          })
        )
        setCurrent(id)
      }
    }

    window.document.addEventListener('renderer', onRenderer, false)

    return () => {
      window.document.removeEventListener('renderer', onRenderer)
    }
  }, [])

  const handleFix = () => {
    console.log('searching for iframe ', current)
    const iframe = document.getElementById(
      current
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
    setTabs((tabs) =>
      tabs.concat({
        id,
        type: 'content',
        title: query.length > 20 ? `${query.slice(0, 20)}..` : query,
        prompt: query,
      })
    )
    setCurrent(id)
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
          activeTab={current}
          onAdd={onAdd}
          onRemove={onRemove}
          onSelect={onSelect}
          tabs={tabs}
        />
      </div>
    </div>
  )
}

export default App
