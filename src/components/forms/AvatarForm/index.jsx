import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from 'semantic-ui-react'

import './AvatarForm.scss'

const AvatarForm = ({ setShowModal }) => {
  const onDrop = useCallback((aceptedFiles) => {
    console.log(aceptedFiles)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    noKeyboard: true,
    multiple: false,
    onDrop,
  })

  return (
    <div className='avatar-form'>
      <Button {...getRootProps()}>Subir foto</Button>
      <Button>Eliminar foto actual</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar</Button>
      <input {...getInputProps()} />
    </div>
  )
}

export default AvatarForm
