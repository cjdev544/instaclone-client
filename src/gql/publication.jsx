import { gql } from '@apollo/client'

export const PUBLISH = gql`
  mutation Publish($file: Upload!, $imageFeet: String) {
    publish(file: $file, imageFeet: $imageFeet) {
      ok
      imageUrl
    }
  }
`

export const GET_USER_PUBLICATIONS = gql`
  query GetUserPublications($username: String!) {
    getUserPublications(username: $username) {
      id
      userId
      imageUrl
      imageFeet
      createAt
    }
  }
`
