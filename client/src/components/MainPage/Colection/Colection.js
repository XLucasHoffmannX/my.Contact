import { useState, useEffect, useContext } from 'react';
import { GlobalState } from '../../../State';
import axios from 'axios';
import CardColection from '../../Utils/Cards/CardColection/CardColection';
import './colection.css'

const Colection = () => {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [callback, setCallback] = useState(false)

  const [category, setCategory] = useState({
    category: ""
  });

  const changeInput = e => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value })
  }

  const [ocult, setOcult] = useState(false);

  const openModal = () => {
    ocult ? setOcult(false) : setOcult(true)
  }

  const [ categoryList, setCategoryList ] = useState([])
  useEffect(()=>{
    const getCategory = async ()=>{
      const res = await axios.get('/api/category', {
        headers: {Authorization : token}
      })
      setCategoryList(res.data)
      console.log(res.data)
    }
    getCategory();
  }, [token, callback])

  const Submit = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/category', {...category }, {
        headers: {Authorization: token}
      })

      callback ? setCallback(false) : setCallback(true)
      setOcult(false)
      setCategory('')
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className="containerColection">
      {
        ocult ?
          <div className="modallAddCategory">
            <div className="displayModallAddCategory">
              <div className="CloseDisplayModallAddCategory">
                <span onClick={openModal}>Fechar</span>
              </div>
              <form onSubmit={Submit}>
                <h2>Criar Coleção</h2>
                <div className="inputControl">
                  <input type="text" name="category" value={category.category} onChange={changeInput} placeholder="Informe o nome de sua coleção..." required />
                  <div className="inputControl btn">
                    <button type="submit">Criar</button>
                  </div>
                </div>
              </form>
            </div>
          </div> : null
      }
      <div className="displayColection">
        <div className="createCard" onClick={openModal}>
          + Criar Coleção
        </div>
        {
          categoryList.map(item=>(
            <CardColection callback={callback} setCallback={setCallback} id={item._id} title={item.category} createAt={item.createAt}/>
          ))
        } 
      </div>
    </div>
  )
}

export default Colection;