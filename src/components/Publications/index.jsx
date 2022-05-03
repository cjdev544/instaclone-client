import { Grid } from 'semantic-ui-react'

import PreviewPublication from './PreviewPublication'
import './Publications.scss'

const Publications = ({ publications }) => {
  return (
    <div className='publications'>
      <Grid columns={3}>
        {publications?.map((publication) => (
          <Grid.Column key={publication.id}>
            <PreviewPublication publication={publication} />
          </Grid.Column>
        ))}
      </Grid>
    </div>
  )
}

export default Publications
