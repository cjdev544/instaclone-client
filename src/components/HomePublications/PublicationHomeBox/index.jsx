import { Link } from 'react-router-dom'
import { Image } from 'semantic-ui-react'

import useLike from '../../../hooks/useLike'
import Actions from '../../Actions'
import ComentForm from '../../forms/ComentForm'
import avatarNoFound from '../../../assets/png/avatar.png'
import './PublicationHomeBox.scss'

const PublicationHomeBox = ({ publication }) => {
  const { addLike } = useLike(publication)

  return (
    <div className='publication-home-box'>
      <div className='publication-home-box__header'>
        <Link
          to={`/${publication.userId.username}`}
          className='publication-home-box__header-user'
        >
          <Image
            src={publication.userId.avatar || avatarNoFound}
            alt={`avatar ${publication.userId.username}`}
            avatar
          />
        </Link>
        <Link to={`/${publication.userId.username}`}>
          <p>{publication.userId.username}</p>
        </Link>
      </div>
      <div
        className='publication-home-box__image'
        onDoubleClick={() => addLike(publication)}
      >
        <Image src={publication.imageUrl} />
      </div>
      <div className='publication-home-box__actions'>
        <Actions publication={publication} />
      </div>
      <div className='publication-home-box__form'>
        <ComentForm publication={publication} />
      </div>
    </div>
  )
}

export default PublicationHomeBox
