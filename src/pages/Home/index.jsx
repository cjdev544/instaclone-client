import { Grid } from 'semantic-ui-react'

import BasicLayout from '../../components/layouts/BasicLayout'
import HomePublications from '../../components/HomePublications'
import SuggestedUsers from '../../components/SuggestedUsers'

const Home = () => {
  return (
    <BasicLayout>
      <Grid className='home'>
        <Grid.Column className='home__left' width={9}>
          <HomePublications />
        </Grid.Column>
        <Grid.Column className='home__right' width={7}>
          <SuggestedUsers />
        </Grid.Column>
      </Grid>
    </BasicLayout>
  )
}

export default Home
