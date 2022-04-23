import { gql } from '@apollo/client'

export const FOLLOW_NO_FOLLOW = gql`
  query Query($username: String!) {
    followNoFollow(username: $username)
  }
`

export const FOLLOW = gql`
  mutation Mutation($username: String!) {
    follow(username: $username)
  }
`

export const UN_FOLLOW = gql`
  mutation Mutation($username: String!) {
    unFollow(username: $username)
  }
`

export const GET_FOLLOWERS = gql`
  query Query($username: String!) {
    getFollowers(username: $username) {
      id
      name
      username
      avatar
    }
  }
`

export const GET_FOLLOWEDS = gql`
  query Query($username: String!) {
    getFolloweds(username: $username) {
      id
      name
      username
      avatar
    }
  }
`
