"use client"

import { type Settings } from '../../types'
import { useSettings } from '../../hooks/useSettings'
import { SettingInput } from '../../components/inputs/SettingInput'
import { Toggle } from '../../components/toggle'

type BaseField = {
  label: string
  description?: string
}

export type SpecializedField =
  | {
      type: 'text'
      placeholder: string
      defaultValue: string
    }
  | {
      type: 'boolean'
      defaultValue: boolean
    }
  | {
      type: 'number'
      placeholder: string
      defaulValue: number
    }
  | {
      type: 'radio'
      defaultValue: string
      options: { description: string; value: string }[]
    }
  | {
      type: 'section'
    }

export type Field = BaseField & SpecializedField

export type SettingsFields = Record<keyof Settings, Field>
export type MiscPanelFields = Record<string, Field>

const fields: Partial<SettingsFields> & MiscPanelFields = {
  core: {
    label: 'Vendor settings',
    description: 'Those are the core settings',
    type: 'section',
  },
  coreVendor: {
    label: 'Backend vendor',
    description: '',
    type: 'radio',
    defaultValue: 'OpenAI',
    options: [
      {
        description:
          'OpenAI - about $0.08 per query (includes search + generation)',
        value: 'OpenAI',
      },
      /*
      {
        description: 'HuggingFace',
        value: 'HuggingFace',
      },
      */
    ],
  },
  /*
  huggingFace: {
    label: 'HuggingFace Settings',
    description:
      'You need a valid HuggingFace account and API token to use this vendor',
    type: 'section',
  },
  huggingFaceKey: {
    label: 'API Key',
    description: '',
    placeholder: 'Enter your HuggingFace API access key',
    type: 'text',
    defaultValue: '',
  },
  huggingFaceModel: {
    label: 'Language Model',
    description: '',
    placeholder: 'Name of a language model hosted on HuggingFace',
    type: 'text',
    defaultValue: 'EleutherAI/gpt-j-6B',
  },
  */
  openAI: {
    label: 'OpenAI Settings',
    description:
      'You need a valid OpenAI account and API token to use this vendor',
    type: 'section',
  },
  openAIKey: {
    label: 'API Key',
    description: '',
    placeholder: 'Enter your OpenAI API access key',
    type: 'text',
    defaultValue: '',
  },
  openAIModel: {
    label: 'Language Model',
    description: '',
    placeholder: 'Enter the model (default: gpt-3.5-turbo-instruct)',
    type: 'text',
    defaultValue: 'gpt-3.5-turbo-instruct',
  },
  /*
  customPrompts: {
    label: 'Custom prompts',
    description: 'Those instructions will be added to all the queries',
    type: 'section',
  },
  customTasksPrompt: {
    label: 'TASKS Prompt',
    description: '',
    placeholder: 'Additional instructions for the application brief..',
    type: 'text',
    defaultValue: '',
  },
  customHtmlPrompt: {
    label: 'HTML Prompt',
    description: '',
    placeholder: 'Additional instructions for the HTML layout..',
    type: 'text',
    defaultValue: '',
  },
  customScriptPrompt: {
    label: 'SCRIPT Prompt',
    description: '',
    placeholder: 'Additional instructions for the Javascript..',
    type: 'text',
    defaultValue: '',
  },
  */
  checkPickSection: {
    label: 'Auto Cherry-Pick',
    description: 'Warning: enabling these options will increase your costs',
    type: 'section',
    // defaultValue: '',
  },
  useAutoCherryPick: {
    label: 'Cherry-Pick Is All You Need™',
    description: 'Re-run the Javascript prompt if an exception is raised',
    type: 'boolean',
    defaultValue: false,
  },
  forDevelopers: {
    label: 'Developer Settings',
    description: 'Settings for developers of the latent browser itself',
    type: 'section',
  },
  useMockData: {
    label: 'Use mock data (free)',
    description:
      'Simulate queries made to the selected vendor, but return fake data instead',
    type: 'boolean',
    defaultValue: false,
  },
}

function Favorites() {
  const [settings, setSettings] = useSettings()
  const isLoading = !settings

  return isLoading ? (
    <div className="flex items-center justify-center h-screen w-screen text-gray-800">
      <div className="flex flex-col p-12 rounded-3xl bg-gray-900/10">
        <h1 className="text-3xl mb-4">Loading favorites..</h1>
        <p></p>
      </div>
    </div>
  ) : (
    <div className="flex flex-col p-12 font-sans">
      <h3 className="text-3xl font-semibold uppercase text-gray-800 ">
        Settings
      </h3>
      <div className="flex flex-col w-full">
        {Object.entries(fields).map(
          ([name, { label, description, ...field }]) => (
            <div key={name} className="flex flex-col py-3 w-full">
              {field.type === 'section' ? (
                <div className="text-xl uppercase font-bold pt-8 mb-1">
                  {label}
                </div>
              ) : (
                <div className="text-xl mb-2">{label}</div>
              )}
              <div className="flex flex-row">
                {field.type === 'text' ? (
                  <SettingInput
                    placeholder={field.placeholder}
                    onChange={(newValue) => {
                      console.log('changed!')
                      setSettings((settings) => ({
                        ...settings,
                        [name]: newValue,
                      }))
                    }}
                    onSubmit={(newValue) => {
                      console.log('saved!')
                      setSettings((settings) => ({
                        ...settings,
                        [name]: newValue,
                      }))
                    }}
                    value={`${settings[name]}`}
                  />
                ) : field.type === 'boolean' ? (
                  <Toggle
                    value={Boolean(settings[name])}
                    onChange={(isChecked) => {
                      setSettings((settings) => ({
                        ...settings,
                        [name]: isChecked,
                      }))
                    }}
                  >
                    {description}
                  </Toggle>
                ) : field.type === 'radio' ? (
                  <div className="flex flex-col space-y-3">
                    {field.options.map(({ description, value }) => (
                      <Toggle
                        key={value}
                        value={value === settings[name]}
                        onChange={(isChecked) => {
                          setSettings((settings) => ({
                            ...settings,
                            [name]: isChecked ? value : '',
                          }))
                        }}
                      >
                        {description}
                      </Toggle>
                    ))}
                  </div>
                ) : (
                  <div>
                    <div className="italic text-gray-600">{description}</div>
                  </div>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default Favorites
