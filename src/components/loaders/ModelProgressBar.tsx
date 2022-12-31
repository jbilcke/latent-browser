export const ModelProgressBar = ({
  elapsedTimeMs,
  estimatedTimeSec,
  isLoading,
  model,
  provider,
  stage,
}: {
  elapsedTimeMs?: number
  estimatedTimeSec?: number
  isLoading?: boolean
  model?: string
  provider?: string
  stage?: string
}) => {
  const elapsedTimeSec = elapsedTimeMs / 1000
  return (
    <div
      className={`font-sans flex items-center h-[22px] pl-1 pr-8 fixed left-0 bottom-0 text-xs rounded-t-md bg-[#D5CFC0] border border-1 border-[#8B8A8B] text-[#1E1E21] transition-all duration-200 ${
        isLoading ? 'opacity-100' : 'opacity-0'
      }`}
    >
      Generating {stage} using {model} -{' '}
      {elapsedTimeSec < estimatedTimeSec
        ? `${Math.round(estimatedTimeSec - elapsedTimeSec)}s remaining`
        : 'this is taking too long..'}{' '}
      {elapsedTimeSec < estimatedTimeSec
        ? ` (${Math.round((elapsedTimeSec / estimatedTimeSec) * 100)}%)`
        : ''}
    </div>
  )
}
