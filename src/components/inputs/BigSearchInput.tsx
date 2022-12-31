export const BigSearchInput = ({
  onChange,
  onSubmit,
  placeholder,
  value,
}: {
  onChange?: (value: string) => void
  onSubmit?: (value: string) => void
  placeholder?: string
  value?: string
}) => (
  <input
    className="font-sans grow text-xl px-6 h-11 items-center rounded-full bg-white shadow-noogle text-toolbar-text placeholder-gray-400 active:outline-0 focus:outline-0 active:focus:outline-0"
    onChange={(e) => onChange?.(e.currentTarget.value)}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        onSubmit?.(e.currentTarget.value)
      }
    }}
    placeholder={placeholder}
    value={value}
  />
)
