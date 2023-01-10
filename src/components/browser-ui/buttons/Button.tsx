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
    className="flex-none bg-gray-400 hover:bg-gray-600 rounded-full pl-4 pr-3 h-30px shadow-lg font-mono text-xs font-normal text-white"
    disabled={disabled}
    onClick={() => onClick?.()}
    type="button"
  >
    {children}
  </button>
)
