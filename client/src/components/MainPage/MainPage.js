import { useContext } from "react";
import { GlobalState } from "../../State";
import { Switch, Route } from "react-router";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Landing from "./Landing/Landing";
import Home from "./Home/Home";
import NotFound from "../Errors/NotFound/NotFound";
import AcessError from "../Errors/AccessError/AcessError";
import CreateContact from "./CreateContact/CreateContact";
import EditContact from "./EditContact/EditContact";
import DetailContact from "./DetailContact/DetailContact";
import Colection from "./Colection/Colection";

const MainPages = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged

  return (
    <Switch>
      <Route path="/" exact component={Landing} />

      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />

      <Route path="/home" exact component={isLogged ? Home : AcessError} />
      <Route path="/colection" exact component={isLogged ?  Colection : AcessError} />
      <Route path="/view/:id" exact component={isLogged ?  DetailContact : AcessError} />
      <Route path="/create-contact" exact component={isLogged ?  CreateContact : AcessError} />
      <Route path="/edit-contact/:id" exact component={isLogged ?  EditContact : AcessError} />

      <Route path="*" exact component={NotFound}/>
    </Switch>
  )
}

export default MainPages;