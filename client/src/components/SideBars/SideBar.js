import { useState, useEffect, useContext } from 'react'
import { GlobalState } from '../../State';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Dock from 'react-dock'
import './sidebar.css'

const SideBar = () => {
  const state = useContext(GlobalState)
  const [isLogged] = state.userAPI.isLogged;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.addEventListener('openSide', () => { setOpen(true) })
  })

  const logout = async () => {
    await axios.get('/api/access/logout');

    localStorage.removeItem('firstLogin')

    window.location.href = '/'
  }

  return (
    <Dock
      isVisible={open}
      onVisibleChange={visible => {
        setOpen(visible)
      }}
      position="right"
      fluid={true}
      size={0.6}
    >
      <div className="containerSide">
        {!isLogged ?
          <div className="sideLogged">
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">Sobre</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Cadastro</Link>
                </li>
              </ul>
            </nav>
          </div>
          :
          <div className="sideLogged">
            <nav>
              <ul>
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to="/create-contact">Adicionar contato</Link>
                </li>
                <li>
                  <Link to="/colection">Coleções</Link>
                </li>
                <li>
                  <Link onClick={logout}>Sair</Link>
                </li>
              </ul>
            </nav>
          </div>
        }
      </div>
    </Dock>
  )
}

export default SideBar;