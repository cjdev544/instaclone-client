import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Image } from 'semantic-ui-react'

import useFollow from '../../../hooks/useFollow'
import useGetData from '../../../hooks/useGetData'
import avatarNoFound from '../../../assets/png/avatar.png'
import './SuggestedUser.scss'

const SuggestedUser = ({ user, userAuth }) => {
  const { followUser, getFollowers, getFolloweds } = useFollow()
  getFolloweds(userAuth.username)
  getFollowers(user.username)
  const { getDataUser } = useGetData()
  const { dataUser } = getDataUser(user.username)

  const [buttonState, setButtonState] = useState('Seguir')

  const handleClickFollow = () => {
    if (dataUser) {
      followUser(dataUser, userAuth)
      setButtonState('Siguiendo')
    }
  }

  return (
    <div className='suggested-user'>
      <div className='suggested-user__auth'>
        <div className='suggested-user__auth-info'>
          <Link to={`/${user.username}`}>
            <Image
              src={user.avatar ? user.avatar : avatarNoFound}
              alt={`avatar ${user.username}`}
              avatar
            />
          </Link>
          <div className='suggested-user__auth-info-name'>
            <Link to={`/${user.username}`}>{user.username}</Link>
          </div>
        </div>
        <Button
          className='suggested-user__auth-info__button'
          onClick={handleClickFollow}
        >
          {buttonState}
        </Button>
      </div>
    </div>
  )
}

export default SuggestedUser
