import { useContext } from 'react'
import { GlobalState } from '../../../../State'
import './cardcolection.css'
import { DeleteIcon } from '../../../Icons/IconsComponents'
import axios from 'axios'

const CardColection = ({callback, setCallback, id, title, createAt}) => {
  const state = useContext(GlobalState);
  const [token] = state.token;

  const removeCategory = async ()=>{
    await axios.delete(`/api/category/${id}`, {
      headers: {Authorization: token}
    })
    callback? setCallback(false) : setCallback(true)
  }

  return (
    <div className="cardCategory">
      <div className="categoryTitle">
        <h2>{title}</h2>
        <span>Criado em {createAt.toLocaleString().substr(0, 10)}</span>
      </div>

      <div className="categoryInfo">
        <div className="removeCategory" onClick={removeCategory}>
          <span>Remover</span>
          <DeleteIcon />
        </div>
      </div>
    </div>
  )
}

export default CardColection;