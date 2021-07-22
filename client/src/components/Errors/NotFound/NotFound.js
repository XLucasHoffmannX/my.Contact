import error404 from '../../Icons/error404.gif'
import { Link } from 'react-router-dom'
import '../errors.css'

const NotFound = ()=>{
  return(
    <div className="notFoundContainer">
      <h1>Essa página não existe!</h1>
      <img src={error404} alt="erro" />
      <span>Aparentemente esta página não está disponível no momento, acesse <Link to="/">my.Contact</Link></span>
    </div>
  )
}

export default NotFound;