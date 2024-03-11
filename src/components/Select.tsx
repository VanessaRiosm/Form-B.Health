import React, {useState} from 'react'

interface SelectProps {
  multiple: boolean
  options: string[]
  value?: string | string[]
  disabled: boolean
  onSelectChange: (value: string[]) => void
}

const Select: React.FC<SelectProps> = ({
  multiple,
  options,
  onSelectChange,
  value,
  disabled,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string | string[]>(
    multiple ? value ?? [] : value ?? ''
  )

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValues = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    )
    setSelectedOptions(selectedValues)
    onSelectChange(selectedValues)
  }

  return (
    <select
      multiple={multiple}
      value={selectedOptions}
      onChange={handleSelectChange}
      disabled={disabled}
      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

export default Select
