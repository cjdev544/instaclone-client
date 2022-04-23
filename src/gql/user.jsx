import { gql } from '@apollo/client'

export const REGISTER_USER = gql`
  mutation CreateUser($input: UserInput) {
    createUser(input: $input) {
      id
      name
      username
      email
      createAt
      avatar
      website
      description
    }
  }
`

export const LOGIN_USER = gql`
  mutation LoginUser($input: LoginInput) {
    loginUser(input: $input) {
      token
    }
  }
`

export const GET_USER = gql`
  query Query($username: String!) {
    getUser(username: $username) {
      id
      name
      username
      email
      avatar
      website
      description
    }
  }
`

export const UPDATE_AVATAR = gql`
  mutation AvatarUpload($file: Upload!) {
    avatarUpload(file: $file) {
      ok
      urlAvatar
    }
  }
`

export const DELETE_AVATAR = gql`
  mutation DeleteAvatar {
    avatarDelete
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateInput) {
    updateUser(input: $input) {
      id
      name
      username
      email
      website
      description
    }
  }
`

export const UPDATE_PASSWORD = gql`
  mutation Mutation($input: UpdatePassword) {
    updatePassword(input: $input)
  }
`

export const SEARCH_USERS = gql`
  query Query($search: String!) {
    search(search: $search) {
      id
      name
      username
      avatar
    }
  }
`
