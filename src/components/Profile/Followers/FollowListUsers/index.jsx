import { useNavigate } from 'react-router-dom'
import { Image } from 'semantic-ui-react'

import ImageNoFound from '../../../../assets/png/avatar.png'
import './FollowListUsers.scss'

const FollowListUsers = ({ list, setShowModal }) => {
  const navigate = useNavigate()

  if (list?.length === 0)
    return <p className='no-found'>No se han encontrado usuarios</p>

  const handleShowUser = (username) => {
    navigate(`/${username}`, { replace: false })
    setShowModal(false)
  }

  return (
    <div className='follow-list'>
      {list?.map((user) => (
        <div
          key={user.id}
          className='follow-list__user'
          onClick={() => handleShowUser(user.username)}
        >
          <Image
            src={user.avatar || ImageNoFound}
            alt='avatar de usuario'
            avatar
          />
          <div>
            <p>{user.name}</p>
            <p>{user.username}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FollowListUsers
