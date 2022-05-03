import { useState } from 'react'
import { Icon, Image } from 'semantic-ui-react'

import useComent from '../../../hooks/useComent'
import useLike from '../../../hooks/useLike'
import PublicationModal from '../../modals/PublicationModal'
import './PreviewPublication.scss'

const PreviewPublication = ({ publication }) => {
  const { dataCounterLike } = useLike(publication)
  const { dataComents } = useComent(publication)

  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className='preview-publication' onClick={() => setShowModal(true)}>
        <Image
          src={publication.imageUrl}
          alt='imagen de publicación'
          className='preview-publication__image'
        />
        <div className='preview-publication__background'>
          <div className='preview-publication__background-icon'>
            <Icon name='heart' />
            <span> {dataCounterLike || 0}</span>
          </div>
          <div className='preview-publication__background-icon'>
            <Icon name='comment' />
            <span>{dataComents?.getComentsPublication?.length || 0}</span>
          </div>
        </div>
      </div>

      <PublicationModal
        showModal={showModal}
        setShowModal={setShowModal}
        publication={publication}
      />
    </>
  )
}

export default PreviewPublication
