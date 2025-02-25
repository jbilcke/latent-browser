export const cleanJSON = (text: string) => {
  const match = text.match(/[{\[][\s\S]*?[}\]][^}\]]*$/);
  if (!match) return '';
  
  // Find the last valid closing bracket
  let result = match[0];
  let depth = 0;
  let lastValidPos = 0;
  
  for (let i = 0; i < result.length; i++) {
    const char = result[i];
    if (char === '{' || char === '[') depth++;
    if (char === '}' || char === ']') {
      depth--;
      if (depth === 0) lastValidPos = i + 1;
    }
  }
  
  return result.substring(0, lastValidPos);
};