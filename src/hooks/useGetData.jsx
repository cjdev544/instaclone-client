import { useQuery } from '@apollo/client'
import { GET_USER } from '../gql/user'

const useGetData = (input) => {
  const {
    data: dataUser,
    loading: loadingUser,
    error: errorUser,
  } = useQuery(GET_USER, {
    variables: {
      username: input,
    },
  })
  const dataQueryUser = {
    dataUser: dataUser?.getUser,
    loadingUser,
    errorUser,
  }

  return {
    dataQueryUser,
  }
}

export default useGetData
