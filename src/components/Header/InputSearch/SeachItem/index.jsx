import { Link } from 'react-router-dom'
import { Image } from 'semantic-ui-react'

import ImageNoFound from '../../../../assets/png/avatar.png'
import './SeachItem.scss'

const SearchItem = ({ data }) => {
  return (
    <Link className='search-item' to={`/${data.username}`}>
      <Image src={data.avatar || ImageNoFound} alt='avatar de usuario' />
      <div>
        <p>{data.title}</p>
        <p>{data.username}</p>
      </div>
    </Link>
  )
}

export default SearchItem
