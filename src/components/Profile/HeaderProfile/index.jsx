import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from 'semantic-ui-react'

import useFollow from '../../../hooks/useFollow'
import './HeaderProfile.scss'

const HeaderProfile = ({ userPage, userAuth, typeModal }) => {
  const { followNoFollow, followUser, unFollowUser } = useFollow()

  const { dataFollow, loadingFollow, errorFollow } = followNoFollow(
    userPage.username
  )

  const [isFollow, setIsFollow] = useState(null)

  useEffect(() => {
    setIsFollow(dataFollow)
  }, [dataFollow])

  const handleFollow = () => {
    followUser(userPage, userAuth)
      .then((data) => {
        if (data.follow) {
          setIsFollow(true)
        } else {
          toast.error('Error de comunicación')
        }
      })
      .catch((err) => console.log(err))
  }

  const handleUnFollow = () => {
    unFollowUser(userPage, userAuth)
      .then((data) => {
        if (data.unFollow) {
          setIsFollow(false)
        } else {
          toast.error('Error de comunicación')
        }
      })
      .catch((err) => console.log(err))
  }

  if (loadingFollow || errorFollow) return null

  return (
    <div className='header-profile'>
      <h2>{userPage.username}</h2>

      {userAuth.username === userPage.username ? (
        <Button className='edit' onClick={() => typeModal('settings')}>
          Editar perfil
        </Button>
      ) : isFollow ? (
        <Button onClick={handleUnFollow}>Dejar de seguir</Button>
      ) : (
        <Button primary onClick={handleFollow}>
          Seguir
        </Button>
      )}
    </div>
  )
}

export default HeaderProfile
