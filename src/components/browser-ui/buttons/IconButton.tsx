import React from 'react'

export const IconButton = ({
  children,
  disabled,
  onClick,
}: {
  children?: React.ReactNode
  disabled?: boolean
  onClick?: () => void
}) => (
  <button
    className="flex items-center justify-center hover:bg-gray-600/20 p-1 rounded-full"
    disabled={disabled}
    onClick={() => onClick?.()}
    type="button"
  >
    {children}
  </button>
)
