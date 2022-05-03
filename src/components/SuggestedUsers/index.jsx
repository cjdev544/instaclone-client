import { Link } from 'react-router-dom'
import { Button, Image } from 'semantic-ui-react'

import useAuth from '../../hooks/useAuth'
import useFollow from '../../hooks/useFollow'
import SuggestedUser from './SuggestedUser'
import avatarNoFound from '../../assets/png/avatar.png'
import './SuggestedUsers.scss'

const SuggestedUsers = () => {
  const { auth, logoutUser } = useAuth()

  const { getNoFolloweds } = useFollow()
  const usersNoFolloweds = getNoFolloweds()

  const handleCloseSession = () => {
    logoutUser()
  }

  return (
    <div className='suggested-users'>
      <div className='suggested-users__auth'>
        <div className='suggested-users__auth-info'>
          <Link to={`/${auth.username}`}>
            <Image
              src={auth.avatar ? auth.avatar : avatarNoFound}
              alt={`avatar ${auth.username}`}
              avatar
            />
          </Link>
          <div className='suggested-users__auth-info-name'>
            <Link to={`/${auth.username}`}>{auth.username}</Link>
            <p>{auth.name}</p>
          </div>
        </div>
        <Button
          className='suggested-users__auth-info__button'
          onClick={handleCloseSession}
        >
          Cerrar
        </Button>
      </div>
      <p>Segerencias para ti</p>
      {usersNoFolloweds?.map((user) => (
        <SuggestedUser key={user.id} user={user} userAuth={auth} />
      ))}
    </div>
  )
}

export default SuggestedUsers
