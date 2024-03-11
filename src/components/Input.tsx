import {useEffect, useState} from 'react'
import {GeneralProps} from '../types'

interface Props extends GeneralProps {
  onInputChange: (id: string, value: string) => void
}

const Input = ({
  id,
  type,
  placeholder,
  onInputChange,
  disabled,
  value: receivedValue,
}: Props) => {
  const [value, setValue] = useState(receivedValue)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    onInputChange(id, e.target.value)
  }
  useEffect(() => {
    setValue(receivedValue)
  }, [receivedValue])

  return (
    <>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value ?? ''}
        onChange={handleChange}
        disabled={disabled}
        className='text-sm rounded-lg block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      />
    </>
  )
}

export default Input
