import Fuse from 'fuse.js'
import { type Plugin, type API, type Plugins, Component } from './types'

// TODO: try to compress/minify the modules names with obfuscated IDs
// we need to test first because I suspect it will impact LLM accuracy:
// - on one side we may loose semantics and the ability for the LLM to generalize
// - on the other side this may be derisable, because it could reduce false generalizations
export const prefix = (plugin: Plugin): API =>
  Object.entries(plugin.api).reduce(
    (acc, [name, value]) => ({
      ...acc,
      [`${plugin.name}.${name}`.toLocaleLowerCase()]: value,
    }),
    {} as unknown as API
  )

const printValues = (values: Array<string | number | boolean>) =>
  values?.length ? ` (${values.join(', ')})` : ''

export const getComponents = (plugins: Plugins): API =>
  Object.entries(plugins).reduce(
    (acc, [_name, plugin]) => ({
      ...acc,
      ...prefix(plugin),
    }),
    {} as API
  )

// return the Markdown documentation of a plugin API
export const getComponentDoc = (
  name: string,
  { description, params }: Component
): string =>
  `# ${name.toLocaleLowerCase()}: ${description}${Object.entries(params || {})
    .map(
      ([param, { description, values }]) =>
        `\n- ${param}: ${description}${printValues(values)}`
    )
    .join('')}`

// return the Markdown documentation of a plugin API
export const getPluginDoc = (plugin: Plugin): string =>
  Object.entries(prefix(plugin))
    .map(([name, component]) => getComponentDoc(name, component))
    .join('\n')

// return the Markdown documentation of a plugin API
export const getDocumentation = (plugins: Plugins): string =>
  Object.values(plugins).map(getPluginDoc).join('\n')

export const getIndex = (components: API) => {
  return new Fuse(
    Object.entries(components).map(([name, component]) => ({
      name,
      ...component,
    })),
    {
      keys: [
        {
          name: 'name',
          weight: 2,
        },
        {
          name: 'description',
          weight: 1,
        },
      ],
      findAllMatches: true,
      isCaseSensitive: false,
      threshold: 1.0,
    }
  )
}
