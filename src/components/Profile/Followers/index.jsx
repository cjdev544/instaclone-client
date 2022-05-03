import { useState } from 'react'

import useFollow from '../../../hooks/useFollow'
import BasicModal from '../../modals/BasicModal'
import FollowListUsers from './FollowListUsers'
import './Followers.scss'

const Followers = ({ userAuth, username, publications }) => {
  const { getFolloweds, getFollowers, getNoFolloweds } = useFollow()

  const dataFolloweds = getFolloweds(username, userAuth)
  const followeds = dataFolloweds?.getFolloweds

  const dataFollowers = getFollowers(username)
  const followers = dataFollowers?.getFollowers

  getNoFolloweds()

  const [titleModal, setTitleModal] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [childrenModal, setChildrenModal] = useState(null)

  const handleModalList = (type) => {
    if (type === 'followers') {
      setTitleModal('Seguidores')
      setShowModal(true)
      setChildrenModal(
        <FollowListUsers list={followers} setShowModal={setShowModal} />
      )
    }

    if (type === 'followeds') {
      setTitleModal('Seguidos')
      setShowModal(true)
      setChildrenModal(
        <FollowListUsers list={followeds} setShowModal={setShowModal} />
      )
    }
  }

  if (!followers || !followeds) return null

  return (
    <>
      <div className='followers'>
        <p>
          <span>{publications}</span> publicaciones
        </p>
        <p className='link' onClick={() => handleModalList('followers')}>
          <span>{followers?.length}</span> seguidores
        </p>
        <p className='link' onClick={() => handleModalList('followeds')}>
          <span>{followeds?.length}</span> seguidos
        </p>
      </div>
      <BasicModal
        showModal={showModal}
        setShowModal={setShowModal}
        title={titleModal}
      >
        {childrenModal}
      </BasicModal>
    </>
  )
}

export default Followers
