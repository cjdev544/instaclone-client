import { Button } from 'semantic-ui-react'

import useAuth from '../../../hooks/useAuth'
import './SettingsForm.scss'
import UpdateUser from './UpdateUser'

const SettingsForm = ({
  setShowModal,
  setTitleModal,
  setChildrenModal,
  dataUser,
}) => {
  const { logoutUser } = useAuth()

  const elegibleForm = (typeForm) => {
    const modalTitles = {
      username: {
        title: 'Cambiar username',
        type: 'text',
        placeholder: 'Nuevo username',
        name: 'username',
      },
      name: {
        title: 'Cambiar nombre',
        type: 'text',
        placeholder: 'Cambia tu nombre',
        name: 'name',
      },
      email: {
        title: 'Cambiar correo',
        type: 'email',
        placeholder: 'Nuevo correo',
        name: 'email',
      },
      website: {
        title: 'Cambiar sitio web',
        type: 'text',
        placeholder: 'Sitio web',
        name: 'website',
      },
      password: {
        title: 'Cambiar la contraseña',
        type: 'password',
        placeholder: 'Nueva contraseña',
        name: 'password',
      },
      description: {
        title: 'Cambiar la descripción',
        type: 'text',
        placeholder: 'Escribe una descripción',
        name: 'description',
      },
    }

    setTitleModal(modalTitles[typeForm].title)

    setChildrenModal(
      <UpdateUser
        atributes={modalTitles[typeForm]}
        dataUser={dataUser}
        setShowModal={setShowModal}
      />
    )
  }

  return (
    <div className='settings-form'>
      <Button onClick={() => elegibleForm('password')}>
        Cambiar contraseña
      </Button>
      <Button onClick={() => elegibleForm('email')}>Cambiar email</Button>
      <Button onClick={() => elegibleForm('username')}>Cambiar username</Button>
      <Button onClick={() => elegibleForm('name')}>Cambiar nombre</Button>
      <Button onClick={() => elegibleForm('description')}>Descripción</Button>
      <Button onClick={() => elegibleForm('website')}>Sitio web</Button>
      <Button onClick={() => logoutUser()}>Cerrar sesión</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar</Button>
    </div>
  )
}

export default SettingsForm
