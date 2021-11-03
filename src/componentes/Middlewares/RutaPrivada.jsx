import { useContext } from 'react'
import { Redirect, Route } from 'react-router'
import { AuthContext } from './AuthMiddleware'

const PrivateRoute = ({ children, ...rest }) => {
  const { currentUser } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={() => (!!currentUser ? children : <Redirect to="/" />)}
    />
  )
}

export default PrivateRoute
