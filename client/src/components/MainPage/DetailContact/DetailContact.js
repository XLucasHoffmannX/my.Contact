import {useParams} from 'react-router-dom';
import './detail.css'

const DetailContact = ()=>{
  const params = useParams();
  return(
    <div className="detail">
        <h1>{params.id}</h1>
    </div>
  )
}

export default DetailContact;