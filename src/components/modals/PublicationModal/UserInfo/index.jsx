import { Image } from 'semantic-ui-react'

import avatarNoFound from '../../../../assets/png/avatar.png'
import './UserInfo.scss'

const UserInfo = ({ dataUser }) => {
  return (
    <div className='user-info'>
      <div className='user-info__image'>
        <Image src={dataUser?.avatar || avatarNoFound} alt='avatar' avatar />
      </div>
      <p>{dataUser.username}</p>
    </div>
  )
}

export default UserInfo
