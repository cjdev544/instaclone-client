import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import usePublication from '../../hooks/usePublication'
import BasicLayout from '../../components/layouts/BasicLayout'
import Profile from '../../components/Profile'
import Publications from '../../components/Publications'

const User = () => {
  const { username } = useParams()

  const [sortPublications, setSortPublications] = useState([])

  const { dataGetPublication, getPublicationUser } = usePublication()
  const {
    data: dataPublications,
    loading: loadingPublications,
    error: errorPublicatios,
  } = dataGetPublication

  useEffect(() => {
    getPublicationUser(username)
  }, [username])

  useEffect(() => {
    if (dataPublications?.getUserPublications) {
      const array = [...dataPublications?.getUserPublications].reverse()
      setSortPublications(array)
    }
  }, [dataPublications])

  return (
    <BasicLayout>
      {!loadingPublications && !errorPublicatios && (
        <div>
          <Profile
            username={username}
            publications={sortPublications?.length}
          />
          <Publications publications={sortPublications} />
        </div>
      )}
    </BasicLayout>
  )
}

export default User
