import { useContext } from 'react'
import { GlobalState } from '../../State';
import { Link } from 'react-router-dom'
import { Logo, LogoSimple, MenuRight, Logout, MenuLeft } from "../Icons/IconsComponents";
import axios from 'axios';
import './header.css'

const Header = () => {
  const state = useContext(GlobalState)

  const [isLogged] = state.userAPI.isLogged;
  const [userInfo] = state.userAPI.userInfo;

  const logout = async () => {
    await axios.get('/api/access/logout');

    localStorage.removeItem('firstLogin')

    window.location.href = '/'
  }

  const OpenSide = ()=>{
    const event = new CustomEvent('openSide')
    window.dispatchEvent(event)
  }

  return (
    <>
      {
        !isLogged ?
          <div className="header_container">
            <div className="header_landing">
              <div className="logo_landing">
                <Link to="/">
                  <Logo />
                </Link>
              </div>

              <nav className="navLanding">
                <ul>
                  <li>
                    <Link to="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/about">
                      Sobre
                    </Link>
                  </li>
                  <li>
                    <Link to="login">
                      Login
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className="menuleftLanding" onClick={OpenSide}>
                <MenuLeft />
              </div>
            </div>
          </div>
          :
          <div className="header_container logged">
            <div className="header_logged">
              <div className="logo_logged">
                <Link to="/home" className="logoSimple">
                  <LogoSimple />
                </Link>
                <Link className="menuRight" onClick={OpenSide}>
                  <MenuRight />
                </Link>
              </div>
              <nav className="navLogged">
                <ul>
                  <li>
                    <Link to="/home">Contatos</Link>
                  </li>
                  <li>
                    <Link to="/colection">Cole????es</Link>
                  </li>
                </ul>
              </nav>
              <div className="perfil_logged">
                <Link>
                  <h2>{userInfo.name}</h2>
                </Link>
                <div className="logoutLogged">
                  <Link to="" onClick={logout}>
                    <h2>Sair</h2>
                    <Logout />
                  </Link>
                </div>
              </div>
            </div>
          </div>
      }
    </>
  )
}

export default Header;