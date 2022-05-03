import usePublication from '../../hooks/usePublication'
import PublicationHomeBox from './PublicationHomeBox'
import './HomePublications.scss'

const HomePublications = () => {
  const { dataHome, loadingHome } = usePublication()

  if (loadingHome) return <p>Cargando publicaciones...</p>

  return (
    <div className='home-publications'>
      {dataHome?.map((publication) => (
        <PublicationHomeBox key={publication.id} publication={publication} />
      ))}
    </div>
  )
}

export default HomePublications
