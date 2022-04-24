import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon, Image } from 'semantic-ui-react'

import useAuth from '../../../hooks/useAuth'
import useGetData from '../../../hooks/useGetData'
import UploadModal from '../../modals/UploadModal'
import ImageNoFound from '../../../assets/png/avatar.png'
import './RightHeader.scss'

const RightHeader = () => {
  const [showModal, setShowModal] = useState(false)

  const { auth } = useAuth()
  const { getDataUser } = useGetData()
  const { dataUser, loadingUser, errorUser } = getDataUser(auth.username)

  if (loadingUser) return null
  if (errorUser) return null

  return (
    <>
      <div className='rigth-header'>
        <Link to='/'>
          <Icon name='home' />
        </Link>
        <Icon name='plus' onClick={() => setShowModal(true)} />
        <Link to={`/${auth.username}`}>
          <Image
            src={dataUser?.avatar ? dataUser.avatar : ImageNoFound}
            avatar
            alt='avatar'
          />
        </Link>
      </div>
      <UploadModal
        showModal={showModal}
        setShowModal={setShowModal}
        dataUser={dataUser}
      />
    </>
  )
}

export default RightHeader
