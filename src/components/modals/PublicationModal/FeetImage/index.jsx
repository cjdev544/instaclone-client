import { Grid, Image } from 'semantic-ui-react'

import avatarNoFound from '../../../../assets/png/avatar.png'
import './FeetImage.scss'

const FeetImage = ({ dataUser, publication }) => {
  return (
    <div className='feet-image'>
      <Grid>
        <Grid.Column width={3}>
          <div className='feet-image__image'>
            <Image src={dataUser.avatar || avatarNoFound} alt='avatar' avatar />
          </div>
        </Grid.Column>
        <Grid.Column width={13} className='comment__text'>
          <p>
            <span>{dataUser.username}</span>
            {publication.imageFeet}
          </p>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default FeetImage
