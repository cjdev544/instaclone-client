import { Link } from 'react-router-dom'
import { Grid, Image } from 'semantic-ui-react'

import avatarNoFound from '../../../../../assets/png/avatar.png'
import './Coment.scss'

const Coment = ({ coment }) => {
  return (
    <div className='coment'>
      <Grid>
        <Grid.Column width={3}>
          <div className='coment__image'>
            <Link to={`/${coment.user.username}`}>
              <Image
                src={coment.user.avatar ? coment.user.avatar : avatarNoFound}
                alt='avatar'
                avatar
              />
            </Link>
          </div>
        </Grid.Column>
        <Grid.Column width={13} className='comment__text'>
          <p>
            <Link to={`/${coment.user.username}`}>
              <span>{coment.user.username}</span>
            </Link>
            {coment.coment}
          </p>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default Coment
