import { Tasks } from './content'
import { libraries } from './libraries'

export interface CommonConfig {
  cssFramework: string
  design: string[]
  logic: string[]
  images: string[]
  direction: string[]
  params: string[]
  returns: string
  modules: string[]
}

export const genericJSDoc = (
  title: string,
  subtitle: string,
  params: string[],
  returns: string
) => `
/**
 * ${title}
 * 
 * ${subtitle}
 * @param ${params.join('\n * @param ')}
 * @returns ${returns}
 */
`

export const genericHtml =
  (
    moduleName: string,
    description: string,
    common: CommonConfig,
    extraCode?: string
  ) =>
  (query: Tasks | string) =>
    `${genericJSDoc(
      description,
      'It will be injected in a <div> somewhere in the page',
      common.params,
      common.returns
    )}
import { ${moduleName} } from 'ai'
${extraCode || ''}
const html = ${moduleName}(${JSON.stringify(query)}, {
  framework: "${common.cssFramework}",
  design: ${JSON.stringify(common.design, null, 2)},
  images: ${JSON.stringify(common.images, null, 2)},
  direction: ${JSON.stringify(common.direction, null, 2)},
})
console.log(html)

output:`

/**
 * Notes about this prompt:
 * GPT-3 can add more libraries if needed
 */
export const genericScript = (id: string) => (query: string, html: string) =>
  `${html}<script>
/**
 * Final implementation of ${query}
 */
// we only use those JS libraries
${Object.values(libraries)
  .filter(({ basic }) => basic)
  .map(({ basic }) => basic)
  .join('\n')}
// persisted app data
window.${id} = {};
// in this project we use 1 space for indentation
// we never re-declare the sam variable twice
// (note: all code comments below have been removed)
`
