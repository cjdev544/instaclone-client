import { useParams } from 'react-router-dom'

import BasicLayout from '../../components/layouts/BasicLayout'
import Profile from '../../components/Profile'

const User = () => {
  const { username } = useParams()

  return (
    <BasicLayout>
      <div>
        <Profile username={username} />
      </div>
    </BasicLayout>
  )
}

export default User
