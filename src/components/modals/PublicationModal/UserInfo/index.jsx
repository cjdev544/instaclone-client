import { Link } from 'react-router-dom'
import { Image } from 'semantic-ui-react'

import avatarNoFound from '../../../../assets/png/avatar.png'
import './UserInfo.scss'

const UserInfo = ({ dataUser }) => {
  return (
    <div className='user-info'>
      <div className='user-info__image'>
        <Link to={`/${dataUser.username}`}>
          <Image src={dataUser?.avatar || avatarNoFound} alt='avatar' avatar />
        </Link>
      </div>
      <p>
        <Link to={`/${dataUser.username}`}>{dataUser.username}</Link>
      </p>
    </div>
  )
}

export default UserInfo
