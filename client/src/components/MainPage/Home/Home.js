import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../../../State';
import { Search } from '../../Icons/IconsComponents';
import HomeBtn from '../../Utils/Buttons/HomeBtn/HomeBtn';
import LinearCard from '../../Utils/Cards/LinearCard/LinearCard';
import axios from 'axios'
import Loader from '../../Utils/Loading/Loader';
import './home.css';

const Home = () => {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [isLogged] = state.userAPI.isLogged;
  const [contacts, setContacts] = useState([]);
  const [callback, setCallback] = useState(false);
  const [search, setSearch] = useState({
    name: ""
  });
  const [filter, setFilter] = useState({
    category: ""
  })

  const handleChange = async e => {
    try {
      const { name, value } = e.target;
      setSearch({ ...search, [name]: value })
      setFilter({ ...filter, [name]: value })
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    const getContacts = async () => {
      if (isLogged) {
        if (search.name === '' || filter.category === '') {
          if (!filter.category && !search.name) {
            const res = await axios.get(`/api/contact/contacts`, {
              headers: { Authorization: token }
            })
            callback ? setCallback(false) : setCallback(true)
            setContacts(res.data)
          }
          if (filter.category) {
            const res = await axios.get(`/api/contact/contacts?category=${filter.category}`, {
              headers: { Authorization: token }
            })
            callback ? setCallback(false) : setCallback(true)
            setContacts(res.data)
          }
          if (search.name) {
            const res = await axios.get(`/api/contact/contacts?name=${search.name}`, {
              headers: { Authorization: token }
            })
            callback ? setCallback(false) : setCallback(true)
            setContacts(res.data)
          }
        }
      }
    }
    getContacts();
  }, [isLogged, filter, callback, search, token])

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

  const [verify, setVerify] = useState(false);
  let contactsList = contacts.map(item => (
    <LinearCard callback={callback} setCallback={setCallback} img={item.images.url} id={item._id} name={item.name} number={item.numberContacts[0].number} />
  ));

  if (contacts.length === 0) {
    contactsList = <span style={{ textAlign: "center" }}>Você não possui nenhum contato ainda <Link to="create-contact">adicione aqui!</Link></span>
    setTimeout(() => {
      setVerify(true)
    }, 300)
  }

  return (
    <div className="homeContainer">
      <div className="displayAdd">
        <h2>O que deseja fazer?</h2>
        <div className="btnArea">
          <HomeBtn title="Adicionar contato" svg="add" link="create-contact" color="--blue-patern" />
          <HomeBtn title="Adicionar coleção" svg="add" link="colection" color="--green-patern" />
          <HomeBtn title="Ver contatos" svg="expand" link="home" color="--purple-patern" />
        </div>
      </div>
      <div className="displayContact">
        <div className="headerSearch">
          <div className="search">
            <div className="iconSearch">
              <Search />
            </div>
            <input type="search" placeholder="Buscar contatos..." name="name" value={search.name} onChange={handleChange} />
          </div>
          <div className="filter">
            <select name="category" value={filter.category} onChange={handleChange} >
              <option value="">Selecione a coleção</option>
              {
                categoryList.map(item => (
                  <option value={item.category} key={item._id}>{item.category}</option>
                ))
              }
            </select>
          </div>
        </div>
        <div className="displayCardsContacts">
          {
            !verify ?
              <Loader />
              :
              contactsList
          }
        </div>
      </div>
    </div>
  )
}

export default Home;