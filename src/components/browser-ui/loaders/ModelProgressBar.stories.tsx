import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ModelProgressBar } from './ModelProgressBar'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'loaders/ModelProgressBar',
  component: ModelProgressBar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    elapsedTime: { control: 'number' },
    estimatedTime: { control: 'number' },
    isLoading: { control: 'boolean' },
    model: { control: 'string' },
    provider: { control: 'string' },
  },
} as ComponentMeta<typeof ModelProgressBar>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ModelProgressBar> = (args) => (
  <ModelProgressBar {...args} />
)

export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  primary: true,
  label: 'Default',
}
