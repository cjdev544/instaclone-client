import { Link } from 'react-router-dom'
import { Icon, Image } from 'semantic-ui-react'

import useAuth from '../../../hooks/useAuth'
import useGetData from '../../../hooks/useGetData'
import ImageNoFound from '../../../assets/png/avatar.png'
import './RightHeader.scss'

const RightHeader = () => {
  const { auth } = useAuth()
  const { getDataUser } = useGetData()
  const { dataUser, loadingUser, errorUser } = getDataUser(auth.username)

  if (loadingUser) return null
  if (errorUser) return null

  return (
    <div className='rigth-header'>
      <Link to='/'>
        <Icon name='home' />
      </Link>
      <Icon name='plus' />
      <Link to={`/${auth.username}`}>
        <Image
          src={dataUser?.avatar ? dataUser.avatar : ImageNoFound}
          avatar
          alt='avatar'
        />
      </Link>
    </div>
  )
}

export default RightHeader
