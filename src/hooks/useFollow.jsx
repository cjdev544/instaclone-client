import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import {
  FOLLOW,
  FOLLOW_NO_FOLLOW,
  GET_FOLLOWEDS,
  GET_FOLLOWERS,
  UN_FOLLOW,
} from '../gql/follow'

const useFollow = () => {
  const [follow] = useMutation(FOLLOW)
  const [unFollow] = useMutation(UN_FOLLOW)

  const [startSearchFollowers, resultFollowers] = useLazyQuery(GET_FOLLOWERS)
  const [startSearchFolloweds, resultFolloweds] = useLazyQuery(GET_FOLLOWEDS)

  const followNoFollow = (username) => {
    const { data, loading, error } = useQuery(FOLLOW_NO_FOLLOW, {
      variables: { username },
    })
    const queryFollow = {
      dataFollow: data?.followNoFollow,
      loadingFollow: loading,
      errorFollow: error,
    }
    return queryFollow
  }

  const followUser = async (username) => {
    const { data } = await follow({
      variables: { username },
    })
    return data
  }

  const unFollowUser = async (username) => {
    const { data } = await unFollow({
      variables: { username },
    })
    return data
  }

  const getAllFollowers = (username) => {
    startSearchFollowers({
      variables: { username },
    })
  }

  const getAllFolloweds = (username) => {
    startSearchFolloweds({
      variables: { username },
    })
  }

  return {
    resultFollowers,
    resultFolloweds,
    followNoFollow,
    followUser,
    unFollowUser,
    getAllFollowers,
    getAllFolloweds,
  }
}

export default useFollow
