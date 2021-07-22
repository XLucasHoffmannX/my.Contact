import { useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import Footer from "../../Footer/Footer";
import { RegisterBack } from "../../Icons/IconsComponents";

const Register = () => {
  const [user, setUser] = useState({
    name: '', email: '', password: '', phone: ''
  })

  const onChangeInput = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value })
  }

  const registerSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post('/api/access/register', { ...user })

      localStorage.setItem('firstLogin', true)

      window.location.href = "/home";
    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  return (
    <div>
      <div className="loginLanding regis">
        <div className="controlLogin">
          <div className="titleRef">
            <h1>Cadastro</h1>
          </div>
          <div className="displayLogin register">
            <form onSubmit={registerSubmit}>
              <div className="inputControl">
                <label htmlFor="">Nome de usuário:</label>
                <input type="text" name="name" value={user.name} onChange={onChangeInput} placeholder="Insira seu nome de usuário..." required />
              </div>
              <div className="inputControl">
                <label htmlFor="">Email:</label>
                <input type="email" name="email" value={user.email} onChange={onChangeInput} placeholder="Entre com seu email..." required />
              </div>
              <div className="inputControl">
                <label htmlFor="">Telefone:</label>
                <input type="number" name="phone" value={user.phone} onChange={onChangeInput} placeholder="Exemplo: 55419988112334" required />
              </div>
              <div className="inputControl">
                <label htmlFor="">Senha:</label>
                <input type="password" name="password" value={user.password} onChange={onChangeInput} placeholder="Sua senha..." required />
              </div>
              <div className="inputControl btn">
                <button type="submit">Cadastrar</button>
              </div>
            </form>
          </div>
          <div className="forgot">
            <span>Já possui uma conta? <Link to="/login">Entrar</Link></span>
          </div>
        </div>
        <div className="backLogin">
          <RegisterBack />
        </div>
      </div>
      <div className="footerApp">
        <Footer />
      </div>
    </div>
  )
}

export default Register;