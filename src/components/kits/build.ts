import { APIKit } from './types'

const printValues = (values: Array<string | number | boolean>) =>
  values?.length ? ` (${values.join(', ')})` : ''

// return the Markdown documentation of a kit
export const build = (kit: APIKit) =>
  Object.entries(kit)
    .map(
      ([name, { component, description, params }]) =>
        `# ${name}: ${description}\n${Object.entries(params || {})
          .map(
            ([param, { description, values }]) =>
              `- ${param}: ${description}${printValues(values)}`
          )
          .join('\n')}`
    )
    .join('\n')
