import { gql } from '@apollo/client'

export const FOLLOW_NO_FOLLOW = gql`
  query FollowNoFollow($username: String!) {
    followNoFollow(username: $username)
  }
`

export const FOLLOW = gql`
  mutation Follow($username: String!) {
    follow(username: $username)
  }
`

export const UN_FOLLOW = gql`
  mutation UnFollow($username: String!) {
    unFollow(username: $username)
  }
`

export const GET_FOLLOWERS = gql`
  query GetFollowers($username: String!) {
    getFollowers(username: $username) {
      id
      name
      username
      avatar
    }
  }
`

export const GET_FOLLOWEDS = gql`
  query GetFolloweds($username: String!) {
    getFolloweds(username: $username) {
      id
      name
      username
      avatar
    }
  }
`

export const GET_NO_FOLLOWEDS = gql`
  query GetNoFolloweds {
    getNoFolloweds {
      id
      username
      avatar
    }
  }
`
