import { gql } from '@apollo/client'

export const PUBLISH = gql`
  mutation Publish($file: Upload!, $imageFeet: String) {
    publish(file: $file, imageFeet: $imageFeet) {
      id
      userId
      imageUrl
      imageFeet
      createAt
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

export const GET_HOME_PUBLICATIONS = gql`
  query GetPublicationsFolloweds {
    getPublicationsFolloweds {
      id
      imageUrl
      imageFeet
      createAt
      userId {
        id
        username
        avatar
      }
    }
  }
`
