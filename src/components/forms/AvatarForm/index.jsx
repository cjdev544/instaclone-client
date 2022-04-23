import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'
import { Button } from 'semantic-ui-react'

import useGetData from '../../../hooks/useGetData'
import './AvatarForm.scss'

const AvatarForm = ({ setShowModal }) => {
  const [loading, setLoading] = useState(false)
  const { avatarUpdate, deleteAvatar } = useGetData()

  const onDrop = useCallback(async (aceptedFiles) => {
    setLoading(true)

    try {
      const { avatarUpload } = await avatarUpdate(aceptedFiles[0])

      if (!avatarUpload.ok) toast.error('Error al cargar el avatar')

      setLoading(false)
      setShowModal(false)
    } catch (err) {
      setLoading(false)
      setShowModal(false)
      console.log(err)
      toast.error('Error al cargar el avatar')
    }
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    noKeyboard: true,
    multiple: false,
    onDrop,
  })

  const handleDelete = async () => {
    setLoading(true)
    try {
      const res = await deleteAvatar()
      if (!res) toast.error('Error al eliminar el avatar')
      setLoading(false)
      setShowModal(false)
    } catch (err) {
      console.log(err)
      toast.error('Error al eliminar el avatar')
      setLoading(false)
      setShowModal(false)
    }
  }

  return (
    <div className='avatar-form'>
      <Button {...getRootProps()} loading={loading}>
        Subir foto
      </Button>
      <Button onClick={handleDelete}>Eliminar foto actual</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar</Button>
      <input {...getInputProps()} />
    </div>
  )
}

export default AvatarForm
