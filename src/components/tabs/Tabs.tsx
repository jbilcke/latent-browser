import React from 'react'
import { DndProvider /*DragSource, DropTarget*/ } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import RCTabs from 'rc-tabs'

/**
 * we could use this example from:
 * https://tabs.react-component.vercel.app/?path=/story/rc-tabs--rendertabbar-dragable
 *
 * however it is based on an older version of rc-tabs and an older version of react-dnd!
 */

export const Tabs = () => {
  const onChange = (activeKey?: string) => {}

  const onEdit = (
    type: 'add' | 'remove',
    info: {
      key?: string
      event:
        | React.MouseEvent<Element, MouseEvent>
        | React.KeyboardEvent<Element>
    }
  ) => {}

  return (
    <RCTabs
      onChange={onChange}
      editable={{ onEdit, showAdd: false }}
      items={[
        {
          label: 'foobar',
          key: 'light',
          children: 'FOOBAR',
        },
        {
          label: 'barfoo',
          key: 'bamboo',
          children: 'BARFOO',
        },
        {
          label: 'barbaz',
          key: 'cute',
          children: 'BARBAZ',
        },
        /*
        {
          label: '+',
          key: 'newtab',
          children: '',
        },
        */
      ]}
    />
  )
}
