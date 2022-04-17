import { ToastContainer } from 'react-toastify'
import useAuth from './hooks/useAuth'

import Auth from './pages/Auth'
import RoutesApp from './routes/RoutesApp'

const App = () => {
  const { auth } = useAuth()

  if (auth === undefined) return null

  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {!auth ? <Auth /> : <RoutesApp />}
    </>
  )
}

export default App
