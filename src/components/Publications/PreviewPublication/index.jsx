import { Icon, Image } from 'semantic-ui-react'

import './PreviewPublication.scss'

const PreviewPublication = ({ publication }) => {
  return (
    <>
      <div className='preview-publication'>
        <Image
          src={publication.imageUrl}
          alt='imagen de publicación'
          className='preview-publication__image'
        />
        <div className='preview-publication__background'>
          <div className='preview-publication__background-icon'>
            <Icon
              // className={isLike ? 'actions-Like active' : 'actions-Like'}
              name='heart'
            />
            <span>12</span>
          </div>
          <div className='preview-publication__background-icon'>
            <Icon
              // className={isLike ? 'actions-Like active' : 'actions-Like'}
              name='comment'
            />
            <span>5</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default PreviewPublication
