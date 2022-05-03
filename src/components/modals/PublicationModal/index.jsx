import { useEffect, useState } from 'react'
import { Grid, Image, Modal } from 'semantic-ui-react'

import useGetData from '../../../hooks/useGetData'
import ComentForm from '../../forms/ComentForm'
import UserInfo from './UserInfo'
import ComentsPublication from './ComentPublication'
import Actions from '../../Actions'
import './PublicationModal.scss'

const PublicationModal = ({ showModal, setShowModal, publication }) => {
  const [username, setUsername] = useState(null)
  const { getDataUserId } = useGetData()

  useEffect(() => {
    if (publication?.userId?.username) {
      setUsername(publication?.userId?.id)
    } else {
      setUsername(publication?.userId)
    }
  }, [publication])

  const { dataUser } = getDataUserId(username)

  if (!dataUser) return null

  return (
    <Modal
      open={showModal}
      onClose={() => setShowModal(false)}
      className='publication-modal'
    >
      <Grid>
        <Grid.Column width={9} className='publication-modal__left'>
          <Image src={publication.imageUrl} alt='imagen de publicacion' />
        </Grid.Column>
        <Grid.Column width={7} className='publication-modal__right'>
          <UserInfo dataUser={dataUser} />
          <ComentsPublication dataUser={dataUser} publication={publication} />
          <Actions publication={publication} />
          <ComentForm publication={publication} />
        </Grid.Column>
      </Grid>
    </Modal>
  )
}

export default PublicationModal
