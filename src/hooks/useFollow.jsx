import { useContext } from 'react'

import FollowContext from '../context/follow/followContext'

const useFollow = () => {
  const stateFollow = useContext(FollowContext)

  const {
    followNoFollowState,
    followUserState,
    unFollowUserState,
    getFollowedsState,
    getNoFollowedsState,
    getFollowersState,
  } = stateFollow

  const followNoFollow = (username) => followNoFollowState(username)

  const followUser = (userPage, userAuth) => followUserState(userPage, userAuth)

  const unFollowUser = (userPage, userAuth) =>
    unFollowUserState(userPage, userAuth)

  const getFolloweds = (username, userAuth) =>
    getFollowedsState(username, userAuth)

  const getNoFolloweds = () => getNoFollowedsState()

  const getFollowers = (username) => getFollowersState(username)

  return {
    followNoFollow,
    followUser,
    unFollowUser,
    getFolloweds,
    getNoFolloweds,
    getFollowers,
  }
}

export default useFollow
