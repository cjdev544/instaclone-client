import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from 'apollo-link-context'
import { getToken } from './utils/token'

const authLink = setContext((_, { headers }) => {
  const token = getToken()

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(
    createUploadLink({
      // uri: `${import.meta.env.VITE_BACKEND_URL}/graphql`,
      uri: `https://instaclone-server-production.up.railway.app/graphql`,
    })
  ),
  connectToDevTools: true,
})

export default client
