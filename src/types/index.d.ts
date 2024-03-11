interface GeneralProps {
  id: string
  type?: string
  label: string
  placeholder: string
  value?: string | string[]
  position?: number
  disabled: boolean
  isInput?: booelan
  options?: string[]
  multiple?: boolean
}
interface SelectProps {
  id: string
  label: string
  type: string
  options: string[]
  multiple: boolean
  position?: number
  value?: string | string[]
  disabled: boolean
  placeholder: string
  isInput?: booelan
}

type Person = {
  name: string
  dni: string
}

interface InitialValues {
  name: string
  dni: string
  gender: string
  email: string
}

interface Form2Data extends FormData {
  email: string
}

interface FormProps {
  [key: string]: string | string[]
  name?: string
  dni?: string
  gender?: string
  email?: string
}

export interface Props {
  inputs: GeneralProps[]
  selects: GeneralProps[]
  initialValues?: FormProps
  peopleList?: Person[]
  isForm2?: boolean
  combinedArray: FormField[]
  onSubmit: (e: React.FormEvent, formData: FormProps) => void
}
