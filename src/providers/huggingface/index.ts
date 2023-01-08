export const query = async (
  prompt: string,
  model: string,
  apiToken: string
) => {
  const response = await fetch(
    `https://api-inference.huggingface.co/models/${model}`,
    {
      headers: { Authorization: `Bearer ${apiToken}` },
      method: 'POST',
      body: JSON.stringify({ inputs: prompt }),
    }
  )
  const result = await response.json()
  console.log('result:', result)
  return result
}
