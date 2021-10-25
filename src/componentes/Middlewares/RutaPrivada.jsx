import { verificarAuth } from "../API/Auth";
import { Redirect, Route } from "react-router";

export default function PrivateRoute({ children, ...rest }) {
    var isAuth = verificarAuth(); 

  
    return (
      <Route {...rest} render={() => (isAuth ? children : <Redirect to="/" />)} />
    );
  }