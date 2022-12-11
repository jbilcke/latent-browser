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

export const genericWebContent =
  (
    id: string,
    moduleName: string,
    description: string,
    common: CommonConfig,
    extraCode?: string
  ) =>
  (query: string) =>
    `${genericJSDoc(
      description,
      'It will be injected in a <div> somewhere in the page',
      common.params,
      common.returns
    )}
import { ${moduleName} } from 'ai'

${extraCode}

// you have access to the following libraries
${common.modules.join('\n')}
${/* window.${id} = {} */ ''}
const html = ${moduleName}(\`${query}\`, {
  framework: "${common.cssFramework}",
  design: ${JSON.stringify(common.design, null, 2)},
  logic: ${JSON.stringify(
    common.logic, // .concat(`you can store your local state in window.${id}`),
    null,
    2
  )}
  images: ${JSON.stringify(common.images, null, 2)},
  direction: ${JSON.stringify(common.direction, null, 2)},
})
console.log(html)

// IMPORTANT: don't forget to generate valid javascript code instructions 
// NEVER write comments like "// your code or implementation goes here", instead write the actual code!

output:`
