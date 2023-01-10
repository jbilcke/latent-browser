export const SearchInput = ({
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
    className="font-sans grow text-sm px-4 h-30px items-center rounded-full bg-toolbar-input text-toolbar-text placeholder-toolbar-placeholder active:outline-0 focus:outline-0 active:focus:outline-0"
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
