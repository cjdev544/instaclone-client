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
