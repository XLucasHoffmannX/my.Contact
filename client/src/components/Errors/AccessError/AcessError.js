import { Link } from "react-router-dom";
import { ErrorAccess } from "../../Icons/IconsComponents";
import '../errors.css'

const AccessError = () => {
  return (
    <div className="notFoundContainer">
      <h1 className="titleAccessError">Não conseguimos processar essa solicitação</h1>
      <ErrorAccess />
      <span>Aparentemente não encontramos nenhum registro seu, acesse <Link to="/">my.Contact</Link></span>
    </div>
  )
}

export default AccessError;