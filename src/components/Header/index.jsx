import { Link } from 'react-router-dom'
import { Container, Grid, Image } from 'semantic-ui-react'

import Logo from '../../assets/png/logo.png'
import RightHeader from './RightHeader'
import InputSearch from './InputSearch'
import './Header.scss'

const Header = () => {
  return (
    <header className='headerApp'>
      <Container>
        <Grid>
          <Grid.Column width={3} className='header__logo'>
            <Link to='/'>
              <Image src={Logo} alt='Instaclone logo' />
            </Link>
          </Grid.Column>
          <Grid.Column width={10} className='header__search'>
            <InputSearch />
          </Grid.Column>
          <Grid.Column width={3} className='header__options'>
            <RightHeader />
          </Grid.Column>
        </Grid>
      </Container>
    </header>
  )
}

export default Header
