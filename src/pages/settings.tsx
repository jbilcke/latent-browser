import { type Settings } from '../types'
import { useSettings } from '../hooks/useSettings'
import { Button } from '../components/buttons/Button'
import { SettingInput } from '../components/inputs/SettingInput'

interface Field {
  label: string
  placeholder: string
}

const fields: Record<keyof Settings, Field> = {
  openAIKey: {
    label: 'OpenAI API Key',
    placeholder: 'Enter your OpenAI API access key',
  },
  openAIModel: {
    label: 'OpenAI Model Name',
    placeholder: 'Enter the model (default: text-davinci-003)',
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
        {Object.entries(fields).map(([field, { label, placeholder }]) => (
          <div key={field} className="flex flex-col py-6 w-full">
            <div className="text-xl capitalize mb-4">{label}</div>
            <div className="flex flex-row">
              <SettingInput
                placeholder={placeholder}
                onChange={(newValue) => {
                  console.log('changed!')
                  setSettings((settings) => ({
                    ...settings,
                    [field]: newValue.trim(),
                  }))
                }}
                onSubmit={(newValue) => {
                  console.log('saved!')
                  setSettings((settings) => ({
                    ...settings,
                    [field]: newValue.trim(),
                  }))
                }}
                value={settings[field] || ''}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Favorites
