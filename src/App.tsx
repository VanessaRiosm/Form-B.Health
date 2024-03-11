import {useEffect, useState} from 'react'
import {Form} from './components/Form'
import {GeneralProps, Person} from './types'

const App = () => {
  const [formDataForm1, setFormDataForm1] = useState({
    name: '',
    dni: '',
    gender: '',
  })
  const [formDataForm2, setFormDataForm2] = useState({
    email: '',
    ...formDataForm1,
  })
  const [form2Key, setForm2Key] = useState(0)

  useEffect(() => {
    setFormDataForm2((prevFormDataForm2) => ({
      ...prevFormDataForm2,
      ...formDataForm1,
    }))
  }, [formDataForm1])

  const handleSubmitForm1 = (e: React.FormEvent, formData: any) => {
    setFormDataForm1(formData)
    setFormDataForm2((prevFormDataForm2) => ({
      ...prevFormDataForm2,
      name: formData.name,
      dni: formData.dni,
      gender: formData.gender,
    }))

    setForm2Key((prevKey) => prevKey + 1)
    e.preventDefault()
  }

  const handleSubmitForm2 = (e: React.FormEvent, formData: any) => {
    console.log('datos recibidos', formData)
    setFormDataForm2((prevFormDataForm2) => ({
      ...prevFormDataForm2,
      name: '',
      dni: '',
      gender: '',
    }))
    e.preventDefault()
  }

  // informacion enviada al formulario 1
  const peopleList: Person[] = [
    {name: 'Juan', dni: '11111111'},
    {name: 'Erica', dni: '22222222'},
    {name: 'Felipe', dni: '33333333'},
    {name: 'Andrea', dni: '44444444'},
    {name: 'David', dni: '55555555'},
  ]

  const form1Inputs: GeneralProps[] = [
    {
      id: 'dni',
      label: 'DNI',
      type: 'number',
      placeholder: 'Ingrese el DNI',
      disabled: false,
      isInput: true,
      position: 2,
    },
  ]

  const form1Selects: GeneralProps[] = [
    {
      id: 'name',
      label: 'Nombre',
      options: peopleList.map((person) => person.name),
      placeholder: 'Seleccione un nombre',
      disabled: false,
      isInput: false,
      position: 1,
      multiple: false,
    },
    {
      id: 'gender',
      label: 'Género',
      options: ['Masculino', 'Femenino'],
      placeholder: 'Seleccione el género',
      disabled: false,
      isInput: false,
      position: 3,
      multiple: false,
    },
  ]

  // informacion enviada al formulario 2
  const form2Inputs: GeneralProps[] = [
    {
      id: 'dni',
      label: 'DNI',
      type: 'number',
      placeholder: 'Ingrese el DNI',
      disabled: true,
      isInput: true,
      position: 2,
    },
    {
      id: 'email',
      label: 'Correo Electrónico',
      type: 'email',
      placeholder: 'Ingrese el correo electrónico',
      disabled: false,
      isInput: true,
      position: 4,
    },
  ]

  const form2Selects: GeneralProps[] = [
    {
      id: 'name',
      label: 'Nombre',
      options: peopleList.map((person) => person.name),
      placeholder: 'Seleccione un nombre',
      disabled: true,
      isInput: false,
      position: 1,
      multiple: false,
    },
    {
      id: 'gender',
      label: 'Género',
      options: ['Masculino', 'Femenino'],
      placeholder: 'Seleccione el género',
      disabled: true,
      isInput: false,
      position: 3,
      multiple: false,
    },
  ]

  // ordenamos los datos dependiendo la propiedad position que trae cada uno
  const combinedArray = [...form1Inputs, ...form1Selects]
  combinedArray.sort((a, b) => (a.position || 0) - (b.position || 0))

  const combinedArrayForm2 = [...form2Inputs, ...form2Selects]
  combinedArrayForm2.sort((a, b) => (a.position || 0) - (b.position || 0))

  return (
    <div className='flex justify-center gap-32 mt-28'>
      <div className='flex flex-col items-center gap-6 '>
        <h2>Formulario 1</h2>
        <Form
          inputs={combinedArray.filter((item) => item.isInput)}
          selects={combinedArray.filter((item) => !item.isInput)}
          onSubmit={(e, formData) => handleSubmitForm1(e, formData)}
          combinedArray={combinedArray}
          peopleList={peopleList}
        />
      </div>

      <div className='flex flex-col items-center gap-6 '>
        <h2>Formulario 2</h2>
        <Form
          key={form2Key}
          inputs={combinedArrayForm2.filter((item) => item.isInput)}
          selects={combinedArrayForm2.filter((item) => !item.isInput)}
          onSubmit={handleSubmitForm2}
          initialValues={formDataForm2}
          combinedArray={combinedArrayForm2}
          isForm2={true}
        />
      </div>
    </div>
  )
}

export default App
