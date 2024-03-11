import Input from './Input'
import Label from './Label'
import Select from './Select'
import {FormProps, GeneralProps, Props, SelectProps} from '../types/index'
import {useEffect, useState} from 'react'

export const Form: React.FC<Props> = ({
  inputs,
  selects,
  onSubmit,
  initialValues,
  peopleList,
  combinedArray,
  isForm2,
}) => {
  const [formValues, setFormValues] = useState<FormProps>(initialValues || {})
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({})
  const [formSubmitted, setFormSubmitted] = useState(false)

  useEffect(() => {
    setFormValues(initialValues || {})
  }, [initialValues])

  useEffect(() => {}, [formValues])

  // validacion de email
  const isValidEmail = (email: string | string[]) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (typeof email === 'string') return emailRegex.test(email)
  }

  //Validacion de inputs
  const validateInput = (id: string, value: string | string[]): string => {
    if (typeof value === 'string' && value.trim().length < 1) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [id]: `El campo ${id} no debe estar vacío`,
      }))
      return 'error'
    } else if (isForm2 && id === 'email' && !isValidEmail(value)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [id]: `El email es incorrecto`,
      }))
      return 'error'
    } else {
      setFormErrors((prevErrors) => ({...prevErrors, [id]: ''}))
      return ''
    }
  }

  //Validacion de selects
  const validateSelect = (id: string, value: string | string[]) => {
    if (value.length === 0) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [id]: `En el campo ${id} debes seleccionar al menos una opción`,
      }))
    } else {
      setFormErrors((prevErrors) => ({...prevErrors, [id]: ''}))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    let isValid = true

    //validacion de los inputs al hacer submit
    inputs.forEach((input) => {
      const inputValue = formValues[input.id] || ''

      if (validateInput(input.id, inputValue) === 'error') {
        isValid = false
      }
    })

    //validacion de los selects al hacer submit
    selects.forEach((select) => {
      const selectValue = formValues[select.id] || []
      validateSelect(select.id, selectValue)

      if (formErrors[select.id]) {
        isValid = false
      }
    })

    //se envia la informacion si no hay errores
    if (isValid) {
      onSubmit(e, formValues)
      if (isForm2) {
        setFormSubmitted(true)
      }
    }
  }

  const handleInputChange = (id: string, value: string) => {
    setFormValues((prevValues) => ({...prevValues, [id]: value}))
    validateInput(id, value)
  }

  const handleSelectChange = (id: string, value: string[]) => {
    if (id === 'name') {
      const selectedPerson = peopleList!.find(
        (person) => person.name === value[0]
      )
      setFormValues({
        ...formValues,
        name: value[0],
        dni: selectedPerson ? selectedPerson.dni : '',
      })
    } else {
      setFormValues((prevValues) => ({...prevValues, [id]: value}))
      validateSelect(id, value)
    }
  }
  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center gap-4'>
      {combinedArray.map((field) => (
        <div key={field.id}>
          <Label htmlFor={field && field.id}> {field && field.label} </Label>
          {field && field.isInput ? (
            <Input
              type={field.type}
              id={field.id}
              label={field.label}
              placeholder={field.placeholder}
              onInputChange={(id, value) => handleInputChange(id, value)}
              value={
                (formValues[field.id] as string) ||
                (field as GeneralProps).value
              }
              disabled={field.disabled}
            />
          ) : (
            <Select
              multiple={(field as SelectProps).multiple || false}
              options={(field as SelectProps).options || []}
              value={
                Array.isArray(formValues[field.id])
                  ? formValues[field.id][0]
                  : formValues[field.id] || (field as SelectProps).value
              }
              onSelectChange={(value) => handleSelectChange(field.id, value)}
              disabled={field.disabled}
            />
          )}
        </div>
      ))}

      <button
        type='submit'
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
      >
        Enviar
      </button>

      {Object.values(formErrors).map((value, index) => (
        <h1 className='text-red-400' key={index}>
          {value}
        </h1>
      ))}

      {formSubmitted && (
        <h1 className='text-green-400'>
          La informacion fue enviada correctamente
        </h1>
      )}
    </form>
  )
}

export default Form
