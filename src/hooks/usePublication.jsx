import { useMutation, useLazyQuery } from '@apollo/client'
import { toast } from 'react-toastify'

import { GET_USER_PUBLICATIONS, PUBLISH } from '../gql/publication'

const usePublication = () => {
  const [publish] = useMutation(PUBLISH)
  const [getPublications, dataGetPublication] = useLazyQuery(
    GET_USER_PUBLICATIONS
  )

  const publishImage = async (file, imageFeet) => {
    try {
      const publication = await publish({
        variables: {
          file,
          imageFeet,
        },
      })
      return publication
    } catch (err) {
      toast.error('Error da comunicación, intente nuevamente')
      return err
    }
  }

  const getPublicationUser = (username) => {
    getPublications({
      variables: { username },
    })
  }

  return {
    dataGetPublication,
    publishImage,
    getPublicationUser,
  }
}

export default usePublication
