import { gql, useMutation, useQuery, useLazyQuery } from '@apollo/client'
import { useApolloClient } from '@apollo/client'

import {
  DELETE_AVATAR,
  GET_USER,
  SEARCH_USERS,
  UPDATE_AVATAR,
  UPDATE_PASSWORD,
  UPDATE_USER,
} from '../gql/user'
import useAuth from './useAuth'

const useGetData = () => {
  const client = useApolloClient()
  const [avatarUpload] = useMutation(UPDATE_AVATAR)
  const [avatarDelete] = useMutation(DELETE_AVATAR)
  const [updateUser] = useMutation(UPDATE_USER)
  const [updatePassword] = useMutation(UPDATE_PASSWORD)
  const [startSearchUsers, resultUserSearch] = useLazyQuery(SEARCH_USERS)

  const { auth } = useAuth()

  const avatarUpdate = async (file) => {
    const { data } = await avatarUpload({
      variables: { file },
    })
    updateCaheAvatar(auth.id, data.avatarUpload.urlAvatar)

    return data
  }

  const deleteAvatar = async () => {
    const { data } = await avatarDelete()

    if (data.avatarDelete) {
      updateCaheAvatar(auth.id, '')
    }
    return data.avatarDelete
  }

  const userUpdate = async (valueToChange, newValue) => {
    const { data } = await updateUser({
      variables: {
        input: { valueToChange, newValue },
      },
    })
    updateCaheUser(auth.id, data.updateUser)

    return data
  }

  const passwordUpdate = async (lastPassword, newPassword) => {
    const { data } = await updatePassword({
      variables: {
        input: { lastPassword, newPassword },
      },
    })
    return data
  }

  const getDataUser = (input) => {
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
    return dataQueryUser
  }

  const getUsersSearch = (searchUser) => {
    startSearchUsers({
      variables: { search: searchUser },
    })
  }

  // Grite chache ************************************
  const updateCaheAvatar = (id, avatar) => {
    client.writeQuery({
      query: gql`
        query WriteUser($id: Int!) {
          user(id: $id) {
            id
            avatar
          }
        }
      `,
      data: {
        user: {
          __typename: 'User',
          id: id,
          avatar: avatar,
        },
      },
    })
  }

  const updateCaheUser = (id, result) => {
    client.writeQuery({
      query: gql`
        query WriteTodo($id: Int!) {
          user(id: $id) {
            id
            username
            email
            description
            website
          }
        }
      `,
      data: {
        user: {
          __typename: 'User',
          id: id,
          ...result,
        },
      },
    })
  }

  const resultSearchUser = resultUserSearch

  return {
    resultSearchUser,
    avatarUpdate,
    deleteAvatar,
    userUpdate,
    passwordUpdate,
    getDataUser,
    getUsersSearch,
  }
}

export default useGetData
