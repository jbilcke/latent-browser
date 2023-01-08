import { CommonConfig, Tasks } from './types'
import { libraries } from './libraries'

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
