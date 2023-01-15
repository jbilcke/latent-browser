export const safeYamlLineReturns = (input: string) => {
  // the character ᐃ will be used to indicate line returns
  // we we replace all line returns with ᐃ
  // except the "normal" YAML line returns
  // (sorry, the substitution code is a bit complicate due to this..)

  // attention! we also need to handle the following case:
  /*
  - "pdf.p߷color=#ff0000":
  - "Welcome to.....find out more..."ᐃ    - # Further paragraphs here
  */
  const step1 = input.trim().replace(/\n/g, 'ᐃ')
  console.log('cleanInput: step1', step1)
  const step2 = step1.replace(/(["]?[:]?)ᐃ(\s*)-\s"/g, '$1\n$2- "')
  console.log('cleanInput: step2', step2)
  return step2
}
