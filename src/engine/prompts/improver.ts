export const getImproverPrompt = (input: string) =>
  `Transform the following YAML document by improving the values.
  It should have 5x more textual content.
${input || ''}`
