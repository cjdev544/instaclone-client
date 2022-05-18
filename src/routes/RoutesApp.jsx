import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import User from '../pages/User'
import Error404 from '../pages/Error404'

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:username' element={<User />} />
        <Route path='/direct/inbox' element={<User />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesApp
