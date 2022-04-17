import { Modal } from 'semantic-ui-react'

import './BasicModal.scss'

const BasicModal = ({ showModal, setShowModal, title, children }) => {
  const onClose = () => setShowModal(false)

  return (
    <Modal
      size='mini'
      open={showModal}
      onClose={onClose}
      className='basic-modal'
    >
      {title && <Modal.Header>{title}</Modal.Header>}
      {children}
    </Modal>
  )
}

export default BasicModal
