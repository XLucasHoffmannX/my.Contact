import { useState, useEffect, useContext } from 'react';
import { GlobalState } from '../../../State';
import { Add, EyeOn, EyeOff } from '../../Icons/IconsComponents'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input'
import Loader from '../../Utils/Loading/Loader';
import 'react-phone-number-input/style.css'


const EditContact = () => {
  const state = useContext(GlobalState);
  const params = useParams();
  const [token] = state.token;
  const [isLogged] = state.userAPI.isLogged;

  const [contactsGet, SetContactsGet] = useState([]);
  const [numberAdd, setNumberAdd] = useState();
  const [numberdata, setNumberData] = useState([]);
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    description: "",
    colection: "",
    numberContacts: []
  });

  const [categoryList, setCategoryList] = useState([])

  useEffect(() => {
    const getCategory = async () => {
      const res = await axios.get('/api/category', {
        headers: { Authorization: token }
      })
      setCategoryList(res.data)
    }
    getCategory();
  }, [token])

  useEffect(() => {
    const getContacts = async () => {
      if (isLogged) {
        const res = await axios.get('/api/contact/contacts', {
          headers: { Authorization: token }
        })
        SetContactsGet(res.data)
      }
    }
    getContacts();
  }, [isLogged, token])


  useEffect(() => {
    if (params.id) {
      contactsGet.forEach(ct => {
        if (ct._id === params.id) {
          const itensCopy = Array.from(numberdata);
          ct.numberContacts.map(e => itensCopy.push(e))
          setNumberData(itensCopy);
          setNumberAdd("");
          setImages(ct.images)
          setContact(ct)
        };
      })
    }
  }, [params.id, contactsGet])

  const changeInput = e => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value })
  }


  const insertNumberData = () => {
    if (!numberAdd) return console.log('');
    const itensCopy = Array.from(numberdata);
    itensCopy.push({ number: numberAdd });
    setNumberData(itensCopy);
    setNumberAdd("");
  }

  const removeNumberData = (index) => {
    const itensCopy = Array.from(numberdata);
    itensCopy.splice(index, 1)
    setNumberData(itensCopy)
  }

  const [ocult, setOCult] = useState(false);
  const OcultClick = () => !ocult ? setOCult(true) : setOCult(false)


  const handleUpload = async e => {
    e.preventDefault();
    const file = e.target.files[0];

    if (!file) return alert("Este arquivo n??o existe!");

    if (file.size > 1024 * 1024) return alert("Este arquivo ?? muito grande!");

    if (file.type !== 'image/jpeg' && file.type !== "image/png") return alert('Imagem de tipo incompat??vel, deve ser jpeg ou png!');

    let formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    const res = await axios.post('/api/upload', formData, {
      headers: {
        Authorization: token,
        'content-type': 'multipart/form-data'
      }
    });
    setLoading(false);
    setImages(res.data)
  }

  const handleDestroy = async () => {
    try {
      setLoading(true);
      await axios.post('/api/destroy', { public_id: images.public_id }, {
        headers: { Authorization: token },
      });
      setLoading(false);
      setImages(false);
    } catch (error) {
      alert(error);
    }
  }

  const Submit = async e => {
    e.preventDefault();
    if (numberdata.length === 0) return alert('Adicionar pelo menos um n??mero!');
    contact.numberContacts = numberdata
    try {
      await axios.put(`/api/contact/edit-contact/${params.id}`, { ...contact, images: images }, {
        headers: { Authorization: token }
      });

      window.location.href = "/home";
    } catch (err) {
      alert(err)
    }
  }

  return (
    <div className="containerCreateContact">
      <div className="displayCreateContact">
        <h2>Editar contato</h2>
        <div className="upload">
          {
            loading ?
              <Loader />
              :
              <div className="circleUpload">
                {
                  images ?
                    <img src={images.url} alt="" />
                    :
                    <input id="file_up" type="file" name="file" onChange={handleUpload} />
                }
                {images ? <div className="destroy" onClick={handleDestroy}>X</div> : null}
              </div>
          }
          <p>Adicione uma imagem</p>
        </div>
        <form onSubmit={Submit}>
          <div className="inputControl">
            <label>Nome do contato:</label>
            <input type="text" name="name" value={contact.name} onChange={changeInput} placeholder="Entre com o nome do contato..." required />
          </div>
          <div className="inputControl">
            <label>Email do contato:</label>
            <input type="email" name="email" value={contact.email} onChange={changeInput} placeholder="Uma descri????o breve..." required />
          </div>
          <div className="inputControl">
            <label>Descri????o</label>
            <input type="text" name="description" value={contact.description} onChange={changeInput} placeholder="Uma descri????o breve..." required />
          </div>
          <div className="inputControl">
            <label>Categoria</label>
            <select className="selectCategory" name="colection" value={contact.colection} onChange={changeInput} required>
              <option>Selecione uma cole????o</option>
              {
                categoryList.map(item => (
                  <option value={item.category} key={item._id}>{item.category}</option>
                ))
              }
            </select>
          </div>
          <div className="inputControl inputControlAddNumbers">
            <label>Adicionar n??meros de contato</label>
            <div className="addNumbers">
              <PhoneInput
                defaultCountry="BR"
                className="inputphone"
                placeholder="Informe o n??mero do telefone"
                value={numberAdd}
                onChange={setNumberAdd}
              />
              <div className="addButonNumber" onClick={insertNumberData}><Add /></div>
            </div>
            {
              numberdata.length === 0 ?
                null
                :
                <div className="viewBlock">
                  <div className="eye" onClick={OcultClick}>
                    {!ocult ?
                      <div className="eyeBtn">
                        <EyeOff />
                        Ocultar
                      </div>
                      :
                      <div className="eyeBtn">
                        <EyeOn />
                        Visualizar
                      </div>
                    }
                  </div>
                </div>
            }
            {
              !ocult ?
                numberdata.length === 0 ? null :
                  <div className="viewNumbersAdd" style={{ height: "200px", background: "#f2f2f2" }}>
                    {
                      numberdata.map((e, index) => (
                        <div className="itemNumber" key={e}>
                          <span>{e.number}</span>
                          <p onClick={() => removeNumberData(index)}>Remover</p>
                        </div>
                      ))
                    }
                  </div>
                :
                null
            }
          </div>
          <div className="inputControl btn" style={{ marginTop: "1.5rem" }}>
            <button type="submit">Editar contato</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditContact;