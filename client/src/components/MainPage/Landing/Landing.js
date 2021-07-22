import { Link } from "react-router-dom";
import { LandingBack } from "../../Icons/IconsComponents";
import Footer from "../../Footer/Footer";
import './landing.css';

const Landing = () => {
  return (
    <div className="landing_container">
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
    </div>
  )
}

export default Landing;