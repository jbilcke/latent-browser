import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { SearchInput } from './SearchInput'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'inputs/SearchInput',
  component: SearchInput,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    placeholder: { control: 'string' },
    value: { control: 'string' },
  },
} as ComponentMeta<typeof SearchInput>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SearchInput> = (args) => (
  <SearchInput {...args} />
)

export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  primary: true,
  label: 'Default',
}
