import { type Settings } from '~/types'
import { useSettings } from '~/hooks'
import { SettingInput, Toggle } from '~/components'

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
    label: 'Core settings ⚙️',
    description: '',
    type: 'section',
  },
  speechToTextLanguage: {
    label: 'Speech recognition language',
    description: '',
    type: 'text',
    defaultValue: 'en',

    // TODO we should probaly grab the language list from the system
    // and put it in an autocomplete or something
    placeholder: 'en, fr..',
  },
  vendor: {
    label: 'Service providers 🧑‍💼',
    description: 'Only OpenAI right now, but more vendors are coming soon',
    type: 'section',
  },
  coreVendor: {
    label: 'LLM service provider',
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
  imageVendor: {
    label: 'Image generation provider',
    description: '',
    type: 'radio',
    defaultValue: 'OpenAI_dalle2',
    options: [
      {
        description: 'OpenAI DALL·E 2 (1024*1024px)',
        value: 'OpenAI_dalle2',
      },
      /*
      {
        description: 'StableDiffusionAPI.com',
        value: 'StableDiffusionAPI',
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
    label: 'OpenAI Settings 💸',
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
    placeholder: 'Enter the model (default: text-davinci-003)',
    type: 'text',
    defaultValue: 'text-davinci-003',
  },
  /*
  stableDiffusionAPI: {
    label: 'StableDiffusionAPI Settings 💸',
    description:
      'You need a StableDiffusionAPI.com account and API token to use this vendor',
    type: 'section',
  },
  stableDiffusionAPIKey: {
    label: 'API Key',
    description: '',
    placeholder: 'Enter your StableDiffusionAPI.com access token',
    type: 'text',
    defaultValue: '',
  },
  */
  customPrompts: {
    label: 'Custom prompts ✍️',
    description: 'Those instructions will be added to all the queries',
    type: 'section',
  },
  customPlannerPrompt: {
    label: 'Planner',
    description: '',
    placeholder: 'The topic, subject, theme, mood..',
    type: 'text',
    defaultValue: '',
  },
  customBuilderPrompt: {
    label: 'Builder',
    description: '',
    placeholder: 'Use a specific layout, components, plugin, parameters..',
    type: 'text',
    defaultValue: '',
  },
  customImproverPrompt: {
    label: 'Improver',
    description: '',
    placeholder: 'Change the language, alter the writing style, text length..',
    type: 'text',
    defaultValue: '',
  },
  checkPickSection: {
    label: 'AUTO-TUNE 👩‍🎤',
    description:
      'Note: those options create more queries, and thus increase costs and latency',
    type: 'section',
    defaultValue: '',
  },
  usePlanStep: {
    label: 'Use PLAN step (recommended)',
    description: 'Take some time for thinking before generating the page',
    type: 'boolean',
    defaultValue: true,
  },
  useImproveStep: {
    label: 'Use IMPROVE step (recommended)',
    description: 'Perform one more request to improve the text content',
    type: 'boolean',
    defaultValue: true,
  },
  useVendorCherryPick: {
    label: 'Socially Acceptable Cherry-Pick™',
    description:
      'Ask the LLM to generate twice and cherry-pick the best (server-side 🍒)',
    type: 'boolean',
    defaultValue: false,
  },
  useAutoCherryPick: {
    label: 'Cherry-Pick Is All You Need™',
    description:
      "Ask the LLM to run again if we can't parse the response (client-side 🍒)",
    type: 'boolean',
    defaultValue: false,
  },
  forDevelopers: {
    label: 'Developer Settings 🔧',
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
  useMockImages: {
    label: 'Use mock images (free)',
    description:
      'Simulate queries made to the selected image vendor, but return fake images instead',
    type: 'boolean',
    defaultValue: false,
  },
  /*
  useTurboPrompt: {
    label: "Use Turboprompt (EXPERIMENTAL - PLEASE DON'T USE 🙏)",
    description:
      'Ask the LLM to attempt data compression (note: IMPROVE step will be skipped)',
    type: 'boolean',
    defaultValue: false,
  },
  */
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
      <h3 className="text-4xl font-semibold uppercase text-gray-800 ">
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
                    value={settings[name]}
                  />
                ) : field.type === 'boolean' ? (
                  <Toggle
                    value={settings[name]}
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
