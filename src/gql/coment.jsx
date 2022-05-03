import { gql } from '@apollo/client'

export const ADD_COMENT = gql`
  mutation AddComent($input: ComentInput) {
    addComent(input: $input) {
      id
      publicationId
      userId
      coment
      createAt
    }
  }
`

export const GET_COMENTS = gql`
  query GetComentsPublication($publicationId: ID!) {
    getComentsPublication(publicationId: $publicationId) {
      id
      coment
      createAt
      user {
        username
        avatar
      }
    }
  }
`
