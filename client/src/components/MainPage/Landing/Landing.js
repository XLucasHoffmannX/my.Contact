import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LandingBack } from "../../Icons/IconsComponents";
import Footer from "../../Footer/Footer";
import './landing.css';
import _debounce from 'lodash.debounce'

const Landing = () => {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = _debounce(() => setWidth(window.innerWidth), 100)

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])
  
  return (
    <div className="landing_container">
      {
        width < 700 ?
          <>
            <div className="landingControl">
              <div className="info">
                <h1>Bem Vindo!</h1>
                <span>O my.contact é uma ferramenta para você guardar seus contatos e organiza-los melhor, quer desfrutar? Cadastra-se no botão abaixo</span>
                <div className="back">
                  <LandingBack />
                </div>
                <div className="button_access">
                  <Link to="/register" >
                    Cadastrar-se
                  </Link>
                </div>
                <div className="forgot">
                  <span>Já possui uma conta? <Link to="/login">Entrar</Link></span>
                </div>
              </div>
            </div>
            <Footer />
          </>
          :
          <>
            <div className="landingControl">
              <div className="info">
                <h1>Bem Vindo!</h1>
                <span>O my.contact é uma ferramenta para você guardar seus contatos e organiza-los melhor, quer desfrutar? Cadastra-se no botão abaixo</span>
                <div className="button_access">
                  <Link to="/register" >
                    Cadastrar-se
                  </Link>
                </div>
                <div className="forgot">
                  <span>Já possui uma conta? <Link to="/login">Entrar</Link></span>
                </div>
              </div>
              <div className="back">
                <LandingBack />
              </div>
            </div>
            <Footer />
          </>
      }
    </div>
  )
}

export default Landing;