import { Redirect, Route } from "react-router";

export default function PrivateRoute({ children, ...rest }) {
    var isAuth = true; 

  
    return (
      <Route {...rest} render={() => (isAuth ? children : <Redirect to="/" />)} />
    );
  }