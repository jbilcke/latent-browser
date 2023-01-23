import { parse as parseArray } from 'yaml'
import { type ComponentTree } from '../../prompts'

const symbols = ['⓪', '①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧']
const pt = (depth: number) => `${symbols[depth]}${'  '.repeat(depth)}- ᐅ`

// a new experimental format
// converts a string in the following format:
// ①ui.navbar߷fluid=true߷rounded=tru,②ui.button߷Home②ui.button߷About
export const parseTurbo = (code: string): ComponentTree => {
  // add some padding for each line, depending on the depth level
  const step1 = code
    .replace(/⓪/g, pt(0))
    .replace(/①/g, pt(1))
    .replace(/②/g, pt(2))
    .replace(/③/g, pt(3))
    .replace(/④/g, pt(4)) // want to refactor this code? well, feel free
    .replace(/⑤/g, pt(5)) // but we should probably add some unit tests first
    .replace(/⑥/g, pt(6))
    .replace(/⑦/g, pt(7))
    .replace(/⑧/g, pt(8))

  // split each line, only keep the non-empty nes
  const step2 = step1.split(/[⓪①②③④⑤⑥⑦⑧]/g).filter((line) => line)

  // convert to a YAML string
  const step3 = step2
    .map((line) => {
      // to make it YAML compliant we need to escape the value
      const [padding, values] = line.split('ᐅ')
      return `${padding}${JSON.stringify(values)}:`
    })
    .join('\n')
  // console.log('step3:', step3)

  // convert to a tree
  const step4 = parseArray(step3)
  // console.log('step4:', step4)

  return step4
}
