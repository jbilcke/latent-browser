import React, { useEffect } from 'react'
// import { DndProvider /*DragSource, DropTarget*/ } from 'react-dnd'
// import HTML5Backend from 'react-dnd-html5-backend'
import RCTabs from 'rc-tabs'
// import { v4 as uuidv4 } from 'uuid'
import { App } from '../../types'

/**
 * we could use this example from:
 * https://tabs.react-component.vercel.app/?path=/story/rc-tabs--rendertabbar-dragable
 *
 * however it is based on an older version of rc-tabs and an older version of react-dnd!
 */

export const Tabs = ({
  activeTab,
  onAdd,
  onRemove,
  onSelect,
  tabs = [],
}: {
  activeTab?: string
  onAdd?: (tabId?: string) => void
  onRemove?: (tabId?: string) => void
  onSelect?: (tabId?: string) => void
  tabs: App[]
}) => {
  const onEdit = (
    type: 'add' | 'remove',
    info: {
      key?: string
      event:
        | React.MouseEvent<Element, MouseEvent>
        | React.KeyboardEvent<Element>
    }
  ) => {
    console.log('onEdit:', { type, info })
    if (type === 'remove') {
      onRemove?.(info.key)
    } else if (type === 'add') {
      onAdd?.()
    }
  }

  const onChange = (tabId?: string) => {
    console.log('tabId:', tabId)
    onSelect?.(tabId)
  }

  // make the tabs background area draggable (to move the browser window)
  useEffect(() => {
    document
      .getElementsByClassName('rc-tabs-nav-wrap')[0]
      .setAttribute('data-tauri-drag-region', '')
    document
      .getElementsByClassName('rc-tabs-nav-wrap')[0]
      .setAttribute('data-tauri-drag-region', '')
  }, [])

  return (
    <div data-tauri-drag-region>
      <RCTabs
        data-tauri-drag-region
        onChange={onChange}
        editable={{ onEdit, showAdd: true }}
        activeKey={activeTab}
        items={tabs.map((app) => ({
          key: app.id,
          label: app.title,
          children: (
            <iframe
              id={app.id}
              className="absolute w-screen h-[calc(100vh-81px)] border-none shadow-google"
              src={`/${app.type}?app=${encodeURIComponent(
                JSON.stringify(app)
              )}`}
            />
          ),
        }))}
      />
    </div>
  )
}
