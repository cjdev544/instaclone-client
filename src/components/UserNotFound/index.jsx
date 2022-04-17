import { Link } from 'react-router-dom'

import './UserNotFound.scss'

const UserNotFound = () => {
  return (
    <div className='user-not-found'>
      <p>Esta página no está disponible.</p>
      <p>
        Es posible que el enlace que has seguido sea incorrecto o que se haya
        eliminado la página. <Link to='/'>Volver a Instaclone.</Link>
      </p>
    </div>
  )
}

export default UserNotFound
