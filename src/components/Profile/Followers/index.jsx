import { useEffect, useState } from 'react'

import useFollow from '../../../hooks/useFollow'
import BasicModal from '../../modals/BasicModal'
import './Followers.scss'
import FollowListUsers from './FollowListUsers'

const Followers = ({ username, publications }) => {
  const { getAllFollowers, getAllFolloweds, resultFollowers, resultFolloweds } =
    useFollow()

  useEffect(() => {
    getAllFollowers(username)
    getAllFolloweds(username)
  }, [username])

  const {
    data: dataFollowers,
    loading: loadingFollowers,
    error: errorFollowers,
  } = resultFollowers
  const {
    data: dataFolloweds,
    loading: loadingFolloweds,
    error: errorFolloweds,
  } = resultFolloweds

  const [titleModal, setTitleModal] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [childrenModal, setChildrenModal] = useState(null)

  const handleModalList = (type) => {
    if (type === 'followers') {
      setTitleModal('Seguidores')
      setShowModal(true)
      setChildrenModal(
        <FollowListUsers
          list={dataFollowers?.getFollowers}
          setShowModal={setShowModal}
        />
      )
    }

    if (type === 'followeds') {
      setTitleModal('Seguidos')
      setShowModal(true)
      setChildrenModal(
        <FollowListUsers
          list={dataFolloweds?.getFolloweds}
          setShowModal={setShowModal}
        />
      )
    }
  }

  if (loadingFollowers || loadingFolloweds || errorFollowers || errorFolloweds)
    return null

  return (
    <>
      <div className='followers'>
        <p>
          <span>{publications}</span> publicaciones
        </p>
        <p className='link' onClick={() => handleModalList('followers')}>
          <span>{dataFollowers?.getFollowers?.length}</span> seguidores
        </p>
        <p className='link' onClick={() => handleModalList('followeds')}>
          <span>{dataFolloweds?.getFolloweds?.length}</span> seguidos
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
