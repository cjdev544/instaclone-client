import { useEffect } from 'react'
import { useApolloClient, useMutation, useLazyQuery } from '@apollo/client'

import useAuth from './useAuth'
import { ADD_COMENT, GET_COMENTS } from '../gql/coment'

const useComent = (publication) => {
  const { cache } = useApolloClient()

  const { auth } = useAuth()

  const [addComent] = useMutation(ADD_COMENT)
  const [startGetComents, dataGetComents] = useLazyQuery(GET_COMENTS)

  useEffect(() => {
    if (publication) {
      startGetComents({
        variables: { publicationId: publication.id },
      })
    }
  }, [publication])

  const addNewComent = async (coment, publication) => {
    try {
      const newComent = await addComent({
        variables: {
          input: {
            publicationId: publication.id,
            coment: coment,
          },
        },
      })
      updateCacheComents(newComent)
    } catch (err) {
      console.log(err)
    }
  }

  const {
    data: dataComents,
    loading: loadingComents,
    error: errorComents,
  } = dataGetComents

  // Write cache ******************************************
  const updateCacheComents = ({ data }) => {
    const { addComent } = data

    const newComent = { ...addComent, user: auth }

    const query = GET_COMENTS
    cache.updateQuery(
      {
        query,
        variables: { publicationId: addComent.publicationId },
      },
      (data) => ({
        getComentsPublication: [...data?.getComentsPublication, newComent],
      })
    )
  }

  return {
    dataComents,
    loadingComents,
    errorComents,
    addNewComent,
  }
}

export default useComent
