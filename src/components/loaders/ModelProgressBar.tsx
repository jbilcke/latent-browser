export const ModelProgressBar = ({
  elapsedTimeMs,
  estimatedTimeSec,
  model,
  provider,
  isLoading,
}: {
  elapsedTimeMs?: number
  estimatedTimeSec?: number
  model?: string
  provider?: string
  isLoading?: boolean
}) => {
  const elapsedTimeSec = elapsedTimeMs / 1000
  return (
    <div
      className={`font-sans flex items-center h-[22px] w-[400px] px-1 fixed left-0 bottom-0 text-xs rounded-t-md bg-[#D5CFC0] border border-1 border-[#8B8A8B] text-[#1E1E21] transition-all duration-200 ${
        isLoading ? 'opacity-100' : 'opacity-0'
      }`}
    >
      Waiting for {model} ({provider}) -{' '}
      {elapsedTimeSec < estimatedTimeSec
        ? Math.round(estimatedTimeSec - elapsedTimeSec)
        : '?'}{' '}
      sec remaining
      {elapsedTimeSec < estimatedTimeSec
        ? ` (${Math.round((elapsedTimeSec / estimatedTimeSec) * 100)}%)`
        : ''}
    </div>
  )
}
