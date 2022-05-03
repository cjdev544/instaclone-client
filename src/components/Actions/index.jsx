import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'

import useLike from '../../hooks/useLike'
import PublicationModal from '../modals/PublicationModal'
import './Actions.scss'

const Actions = ({ publication }) => {
  let { pathname } = useLocation()

  const { isLike, loadingIsLike, dataCounterLike, addLike, removeLike } =
    useLike(publication)

  const [showModal, setShowModal] = useState(false)

  const handleClickLike = () => {
    if (isLike) {
      removeLike(publication)
    } else {
      addLike(publication)
    }
  }

  const handleClickComent = () => {
    if (pathname === '/') {
      console.log(pathname)
      setShowModal(true)
    }
  }

  if (loadingIsLike) return null

  return (
    <>
      <div className='actions'>
        <div className='actions-icons'>
          <Icon
            className={isLike ? 'actions-Like active' : 'actions-Like'}
            name={isLike ? 'heart' : 'heart outline'}
            onClick={handleClickLike}
          />
          <Icon name='comment outline' onClick={handleClickComent} />
        </div>
        <p>{dataCounterLike || 0} Me gusta</p>
      </div>

      <PublicationModal
        showModal={showModal}
        setShowModal={setShowModal}
        publication={publication}
      />
    </>
  )
}

export default Actions
