import { useState } from 'react'
import { Grid, Image } from 'semantic-ui-react'

import useGetData from '../../hooks/useGetData'
import useAuth from '../../hooks/useAuth'
import UserNotFound from '../UserNotFound'
import BasicModal from '../modals/BasicModal'
import AvatarForm from '../forms/AvatarForm'
import SettingsForm from '../forms/SettingsForm'
import ImageNoFound from '../../assets/png/avatar.png'
import HeaderProfile from './HeaderProfile'
import Followers from './Followers'
import './Profile.scss'

const Profile = ({ username, publications }) => {
  const { getDataUser } = useGetData()
  const { dataUser, loadingUser, errorUser } = getDataUser(username)

  const { auth } = useAuth()

  const [showModal, setShowModal] = useState(false)
  const [titleModal, setTitleModal] = useState('')
  const [childrenModal, setChildrenModal] = useState(null)

  const typeModal = (type) => {
    if (type === 'avatar') {
      setShowModal(true)
      setTitleModal('Cambiar foto del perfil')
      setChildrenModal(<AvatarForm setShowModal={setShowModal} />)
    }
    if (type === 'settings') {
      setShowModal(true)
      setTitleModal('')
      setChildrenModal(
        <SettingsForm
          setShowModal={setShowModal}
          setTitleModal={setTitleModal}
          setChildrenModal={setChildrenModal}
          dataUser={dataUser}
        />
      )
    }
  }

  if (loadingUser) return null
  if (errorUser) return <UserNotFound />

  return (
    <>
      <Grid className='profile'>
        <Grid.Column width={5} className='profile__left'>
          <Image
            src={dataUser?.avatar ? dataUser.avatar : ImageNoFound}
            avatar
            alt='avatar de usuario'
            onClick={() => username === auth?.username && typeModal('avatar')}
          />
        </Grid.Column>
        <Grid.Column width={11} className='profile__right'>
          <HeaderProfile
            userPage={dataUser}
            userAuth={auth?.username}
            typeModal={typeModal}
          />
          <Followers username={username} publications={publications} />
          <div className='others'>
            <p className='name'>{dataUser.name}</p>
            {dataUser.website && (
              <a href={dataUser.website} className='website' target='_blank'>
                {dataUser.website}
              </a>
            )}
            {dataUser.description && (
              <p className='description'>{dataUser.description}</p>
            )}
          </div>
        </Grid.Column>
      </Grid>
      <BasicModal
        showModal={showModal}
        setShowModal={setShowModal}
        title={titleModal}
      >
        {childrenModal}
      </BasicModal>
    </>
  )
}

export default Profile
