import { useApolloClient, useMutation, useQuery } from '@apollo/client'

import FollowContext from './followContext'
import {
  FOLLOW,
  FOLLOW_NO_FOLLOW,
  GET_FOLLOWEDS,
  GET_NO_FOLLOWEDS,
  GET_FOLLOWERS,
  UN_FOLLOW,
} from '../../gql/follow'

const FollowState = ({ children }) => {
  const { cache } = useApolloClient()

  const [follow] = useMutation(FOLLOW)
  const [unFollow] = useMutation(UN_FOLLOW)

  const followNoFollowState = (username) => {
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

  const followUserState = async (userPage, userAuth) => {
    const { data } = await follow({
      variables: { username: userPage.username },
    })
    updateFolloweds(userPage, userAuth)
    return data
  }

  const unFollowUserState = async (userPage, userAuth) => {
    const { data } = await unFollow({
      variables: { username: userPage.username },
    })
    updateUnFolloweds(userPage, userAuth)
    return data
  }

  const getFollowedsState = (username, userAuth) => {
    const { data } = useQuery(GET_FOLLOWEDS, {
      variables: { username },
    })

    useQuery(GET_FOLLOWEDS, {
      variables: { username: userAuth },
    })
    return data
  }

  const getNoFollowedsState = () => {
    const { data } = useQuery(GET_NO_FOLLOWEDS)
    return data?.getNoFolloweds
  }

  const getFollowersState = (username) => {
    const { data } = useQuery(GET_FOLLOWERS, {
      variables: { username },
    })
    return data
  }

  // write cache ******************************************
  const updateUnFolloweds = (userPage, userAuth) => {
    const query = GET_FOLLOWEDS

    cache.updateQuery(
      {
        query,
        variables: {
          username: userAuth.username,
        },
      },
      (data) => {
        const newArray = data.getFolloweds.filter(
          (follow) => follow.id !== userPage.id
        )
        return {
          getFolloweds: newArray,
        }
      }
    )

    const query2 = GET_FOLLOWERS
    cache.updateQuery(
      {
        query: query2,
        variables: {
          username: userPage.username,
        },
      },
      (data) => {
        const newArray = data.getFollowers.filter(
          (follow) => follow.id !== userAuth.id
        )
        return {
          getFollowers: newArray,
        }
      }
    )

    const query3 = GET_NO_FOLLOWEDS
    cache.updateQuery(
      {
        query: query3,
      },
      (data) => {
        return {
          getNoFolloweds: [...data.getNoFolloweds, userPage],
        }
      }
    )
  }

  const updateFolloweds = (userPage, userAuth) => {
    const query = GET_FOLLOWEDS
    cache.updateQuery(
      {
        query,
        variables: {
          username: userAuth.username,
        },
      },
      (data) => {
        return {
          getFolloweds: [...data.getFolloweds, userPage],
        }
      }
    )

    const query2 = GET_FOLLOWERS
    cache.updateQuery(
      {
        query: query2,
        variables: {
          username: userPage.username,
        },
      },
      (data) => {
        return {
          getFollowers: [...data.getFollowers, userAuth],
        }
      }
    )

    const query3 = GET_NO_FOLLOWEDS
    cache.updateQuery(
      {
        query: query3,
      },
      (data) => {
        return {
          getNoFolloweds: data.getNoFolloweds.filter(
            (noFollowed) => noFollowed.id !== userPage.id
          ),
        }
      }
    )
  }

  const followState = {
    followNoFollowState,
    followUserState,
    unFollowUserState,
    getFollowedsState,
    getNoFollowedsState,
    getFollowersState,
  }

  return (
    <FollowContext.Provider value={followState}>
      {children}
    </FollowContext.Provider>
  )
}

export default FollowState
