import { useMemo, useState } from 'react'
import { useMutation } from '@apollo/client'
import jwt_decode from 'jwt-decode'
import { toast } from 'react-toastify'

import AuthContext from './authContext'
import { removeToken, setToken } from '../../utils/token'
import { LOGIN_USER, REGISTER_USER } from '../../gql/user'

const AuthState = ({ children }) => {
  const [createUser] = useMutation(REGISTER_USER)
  const [loginUser] = useMutation(LOGIN_USER)

  const [auth, setAuth] = useState(undefined)

  const setUser = (token) => {
    const user = jwt_decode(token)
    setAuth(user)
  }

  const register = async (values, setShowLogin, setIsLoading) => {
    try {
      const newUser = values
      delete newUser.repitPassword

      await createUser({
        variables: {
          input: values,
        },
      })

      setIsLoading(false)
      toast.success('Usuario registrado con exito')
      setShowLogin(true)
    } catch (err) {
      setIsLoading(false)
      console.log(err)
      toast.error(err.message)
    }
  }

  const login = async (values, setIsLoading) => {
    try {
      const { data } = await loginUser({
        variables: {
          input: values,
        },
      })

      setToken(data.loginUser.token)

      const user = jwt_decode(data.loginUser.token)
      setAuth(user)
      setIsLoading(false)
    } catch (err) {
      toast.error(err.message)
      console.log(err)
      setIsLoading(false)
    }
  }

  const logoutUser = () => {
    removeToken()
    setAuth(null)
  }

  const authData = useMemo(
    () => ({
      auth,
      setAuth,
      setUser,
      register,
      login,
      logoutUser,
    }),
    [auth]
  )

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  )
}

export default AuthState
