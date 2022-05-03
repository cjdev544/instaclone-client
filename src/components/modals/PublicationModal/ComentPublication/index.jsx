import useComent from '../../../../hooks/useComent'
import FeetImage from '../FeetImage'
import Coment from './Coment'
import './ComentsPublication.scss'

const ComentsPublication = ({ dataUser, publication }) => {
  const { dataComents } = useComent(publication)
  const coments = dataComents?.getComentsPublication

  return (
    <div className='coments-publication'>
      <FeetImage dataUser={dataUser} publication={publication} />
      {coments?.map((coment) => (
        <Coment key={coment.id} coment={coment} />
      ))}
    </div>
  )
}

export default ComentsPublication
