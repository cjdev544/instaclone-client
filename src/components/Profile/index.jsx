import { useState } from 'react'
import { Grid, Image } from 'semantic-ui-react'

import useGetData from '../../hooks/useGetData'
import useAuth from '../../hooks/useAuth'
import UserNotFound from '../UserNotFound'
import BasicModal from '../modals/BasicModal'
import AvatarForm from '../forms/AvatarForm'
import ImageNoFound from '../../assets/png/avatar.png'
import './Profile.scss'

const Profile = ({ username }) => {
  const { dataQueryUser } = useGetData(username)
  const { dataUser, loadingUser, errorUser } = dataQueryUser
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
  }

  if (loadingUser) return null
  if (errorUser) return <UserNotFound />

  return (
    <>
      <Grid className='profile'>
        <Grid.Column width={5} className='profile__left'>
          <Image
            src={ImageNoFound}
            avatar
            alt='avatar'
            onClick={() => username === auth?.username && typeModal('avatar')}
          />
        </Grid.Column>
        <Grid.Column width={11} className='profile__right'>
          <div>Header profile</div>
          <div>Folloers</div>
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
