import { useEffect } from 'react'
import { useMutation, useLazyQuery, useApolloClient } from '@apollo/client'
import { toast } from 'react-toastify'

import {
  GET_HOME_PUBLICATIONS,
  GET_USER_PUBLICATIONS,
  PUBLISH,
} from '../gql/publication'
import useAuth from './useAuth'

const usePublication = () => {
  const { cache } = useApolloClient()

  const { auth } = useAuth()

  const [publish] = useMutation(PUBLISH)
  const [getPublications, dataGetPublication] = useLazyQuery(
    GET_USER_PUBLICATIONS
  )
  const [StartDataHomePublications, dataHomePublications] = useLazyQuery(
    GET_HOME_PUBLICATIONS
  )

  useEffect(() => {
    StartDataHomePublications()
  }, [])

  const { data: dataHomeP, loading: loadingHome } = dataHomePublications
  const dataHome = dataHomeP?.getPublicationsFolloweds

  const publishImage = async (file, imageFeet) => {
    try {
      const publication = await publish({
        variables: {
          file,
          imageFeet,
        },
      })

      updateCachePublications(publication)
      return publication
    } catch (err) {
      toast.error('Error en la comunicación, intente nuevamente')
      return err
    }
  }

  const getPublicationUser = (username) => {
    getPublications({
      variables: { username },
    })
  }

  // Write cache ******************************************
  const updateCachePublications = ({ data }) => {
    getPublicationUser(auth?.username)

    const newPublication = data.publish

    if (!newPublication.imageFeet) newPublication.imageFeet = ''

    const query = GET_USER_PUBLICATIONS
    cache.updateQuery(
      {
        query,
        variables: { username: auth?.username },
      },
      (data) => ({
        getUserPublications: [...data?.getUserPublications, newPublication],
      })
    )
  }

  return {
    dataHome,
    dataGetPublication,
    loadingHome,
    publishImage,
    getPublicationUser,
  }
}

export default usePublication
