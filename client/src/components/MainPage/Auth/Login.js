import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Footer/Footer";
import axios from 'axios';
import { LoginBack } from "../../Icons/IconsComponents";
import './access.css'

const Login = () => {
  const [user, setUser] = useState({
    name: '', password: ''
  })

  const onChangeInput = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value })
  }

  const loginSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/access/login', { ...user }, { credentials: 'include' })

      console.log(res.data)
      localStorage.setItem('firstLogin', true)

      if (res) window.location.href = "/home";
    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  return (
    <div>
      <div className="loginLanding">
        <div className="controlLogin">
          <div className="titleRef">
            <h1>Login</h1>
          </div>
          <div className="displayLogin">
            <form onSubmit={loginSubmit}>
              <div className="inputControl">
                <label htmlFor="">Email:</label>
                <input type="email" name="email" value={user.email} onChange={onChangeInput} placeholder="Entre com seu email..." required />
              </div>
              <div className="inputControl">
                <label htmlFor="">Senha:</label>
                <input type="password" name="password" value={user.password} onChange={onChangeInput} placeholder="Sua senha..." required />
              </div>
              <div className="inputControl btn">
                <button type="submit">Acessar</button>
              </div>
            </form>
          </div>
          <div className="forgot">
            <span>Não possui uma conta ainda? <Link to="/register">Cadastre-se</Link></span>
          </div>
        </div>
        <div className="backLogin">
          <LoginBack />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Login;