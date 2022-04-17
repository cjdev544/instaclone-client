import { Link } from 'react-router-dom'
import { Icon, Image } from 'semantic-ui-react'

import ImageNoFound from '../../../assets/png/avatar.png'
import useAuth from '../../../hooks/useAuth'
import './RightHeader.scss'

const RightHeader = () => {
  const { auth } = useAuth()

  return (
    <div className='rigth-header'>
      <Link to='/'>
        <Icon name='home' />
      </Link>
      <Icon name='plus' />
      <Link to={`/${auth.username}`}>
        <Image src={ImageNoFound} avatar alt='avatar' />
      </Link>
    </div>
  )
}

export default RightHeader
