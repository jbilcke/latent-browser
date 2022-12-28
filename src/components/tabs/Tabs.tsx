import React from 'react'
import { DndProvider /*DragSource, DropTarget*/ } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import RCTabs from 'rc-tabs'
import { v4 as uuidv4 } from 'uuid'

export interface PromptTab {
  id: string
  type: 'search' | 'content'
  title: string
  prompt: string
}

/**
 * we could use this example from:
 * https://tabs.react-component.vercel.app/?path=/story/rc-tabs--rendertabbar-dragable
 *
 * however it is based on an older version of rc-tabs and an older version of react-dnd!
 */

export const Tabs = ({
  onAdd,
  onRemove,
  onSelect,
  tabs = [],
}: {
  onAdd?: (tabId?: string) => void
  onRemove?: (tabId?: string) => void
  onSelect?: (tabId?: string) => void
  tabs: PromptTab[]
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

  return (
    <RCTabs
      onChange={onChange}
      editable={{ onEdit, showAdd: true }}
      items={tabs.map(({ id, type, title, prompt }) => ({
        key: id,
        label: title,
        children: <div></div>,
      }))}
    />
  )
}
