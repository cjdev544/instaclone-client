import { gql } from '@apollo/client'

export const IS_LIKE = gql`
  query IsLike($publicationId: ID!) {
    isLike(publicationId: $publicationId)
  }
`
export const ADD_LIKE = gql`
  mutation AddLike($publicationId: ID!) {
    addLike(publicationId: $publicationId)
  }
`
export const REMOVE_LIKE = gql`
  mutation RemoveLike($publicationId: ID!) {
    removeLike(publicationId: $publicationId)
  }
`

export const COUNTER_LIKE = gql`
  query CountLike($publicationId: ID!) {
    countLike(publicationId: $publicationId)
  }
`
