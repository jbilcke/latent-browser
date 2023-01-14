import { parse } from 'yaml'

// note: this is not used yet (maybe it never will)
export const safeParse = (yaml: string) =>
  parse(
    yaml
      .split('\n')
      .map((line) => {
        const [key, ...chunks] = line.split(':')
        if (chunks.length < 1) {
          return line
        }
        // we need to sanitize lines that are like this:
        // - "pdf.p": This is the recipe for the invisibility potion:
        const lastChunk = chunks[chunks.length - 1]
        const isEscaped = lastChunk[lastChunk.length - 1] === '"'
        if (isEscaped) {
          return line
        }
        // we need to escape the value
        const value = JSON.stringify(chunks.join(':'))
        return [key, value].join(': ')
      })
      .join('\n')
  )
