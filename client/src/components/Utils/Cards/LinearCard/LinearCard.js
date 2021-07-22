import { useContext } from 'react';
import { GlobalState } from '../../../../State';
import { Link } from 'react-router-dom';
import './linearcard.css'
import axios from 'axios'

const LinearCard = ({callback, setCallback, id, img, name, number }) => {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const removeContact = async ()=>{
    await axios.delete(`/api/contact/remove-contact/${id}`, {
      headers: {Authorization: token}
    });

    callback ? setCallback(false) : setCallback(true)
  }
  return (
    <div className="linearCard">
      <div className="contentContact">
        <div className="imgContact">
          {img ? <img src={`${img}`} alt="" /> : null}
        </div>
        <div className="userNameContact">
          <h2>{name}</h2>
          <span>{number}</span>
        </div>
      </div>
      <div className="btnAreaCard">
        <Link to={`/view/${id}`} className="view">Visualizar</Link>
        <Link to={`edit-contact/${id}`} className="edit">Editar</Link>
        <span className="remove" style={{cursor: "pointer"}}onClick={removeContact}>Remover</span>
      </div>
    </div>
  )
}

export default LinearCard;