import { useContext, useEffect } from 'react'

import AuthContext from '../context/auth/authContext'
import { getToken } from '../utils/token'

const useAuth = () => {
  const { auth, setAuth, register, login, setUser, logoutUser } =
    useContext(AuthContext)

  useEffect(() => {
    const token = getToken()
    if (token) {
      setUser(token)
    } else {
      setAuth(null)
    }
  }, [])

  const registerUser = (values, setShowLogin) => register(values, setShowLogin)

  const loginUser = (values) => login(values)

  return {
    auth,
    registerUser,
    loginUser,
    logoutUser,
  }
}

export default useAuth
