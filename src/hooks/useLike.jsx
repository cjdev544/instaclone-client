import { useEffect } from 'react'
import { useApolloClient, useLazyQuery, useMutation } from '@apollo/client'
import { toast } from 'react-toastify'

import { ADD_LIKE, COUNTER_LIKE, IS_LIKE, REMOVE_LIKE } from '../gql/like'

const useLike = (publication = '') => {
  const { cache } = useApolloClient()

  const [startIsLike, isLikeData] = useLazyQuery(IS_LIKE)
  const [startCounterLike, counterLikeData] = useLazyQuery(COUNTER_LIKE)

  const [addLikePublication] = useMutation(ADD_LIKE)
  const [removeLikePublication] = useMutation(REMOVE_LIKE)

  useEffect(() => {
    if (publication) {
      startIsLike({
        variables: {
          publicationId: publication.id,
        },
      })
    }
  }, [publication])

  useEffect(() => {
    if (publication) {
      startCounterLike({
        variables: {
          publicationId: publication.id,
        },
      })
    }
  }, [publication])

  const isLike = isLikeData?.data?.isLike
  const loadingIsLike = isLikeData?.loading

  const addLike = async (publication) => {
    try {
      await addLikePublication({
        variables: {
          publicationId: publication.id,
        },
      })
      updateCacheLikePublications(publication)
      updateCacheCounterLikePublications(publication, true)
    } catch (err) {
      console.log(err)
      toast.error('Error en la comunicación')
    }
  }

  const removeLike = async (publication) => {
    try {
      await removeLikePublication({
        variables: { publicationId: publication.id },
      })
      updateCacheLikePublications(publication)
      updateCacheCounterLikePublications(publication, false)
    } catch (err) {
      console.log(err)
      toast.error('Error en la comunicación')
    }
  }

  const { data } = counterLikeData
  const dataCounterLike = data?.countLike

  // Write cache ******************************************
  const updateCacheLikePublications = (publication) => {
    const query = IS_LIKE

    cache.updateQuery(
      {
        query,
        variables: { publicationId: publication.id },
      },
      (data) => ({
        isLike: !data.isLike,
      })
    )
  }

  const updateCacheCounterLikePublications = (publication, like) => {
    const query = COUNTER_LIKE

    cache.updateQuery(
      {
        query,
        variables: { publicationId: publication.id },
      },
      (data) => {
        if (like) {
          return {
            countLike: data.countLike + 1,
          }
        } else {
          return {
            countLike: data.countLike - 1,
          }
        }
      }
    )
  }

  return {
    isLike,
    loadingIsLike,
    dataCounterLike,
    addLike,
    removeLike,
  }
}

export default useLike
