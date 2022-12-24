import React from 'react'

export const Button = ({
  children,
  disabled,
  onClick,
}: {
  children?: React.ReactNode
  disabled?: boolean
  onClick?: () => void
}) => (
  <button
    className="flex-none bg-gray-700/30 hover:bg-gray-500/60 rounded-full px-4 h-30px shadow-lg font-mono text-xs font-normal text-white"
    disabled={disabled}
    onClick={() => onClick?.()}
    type="button"
  >
    {children}
  </button>
)
