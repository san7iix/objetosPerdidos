import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './componentes/Generales/Landing'
import Navbar from './componentes/Generales/Navbar'
import Login from './componentes/Usuario/Login'
import Registro from './componentes/Usuario/Registro'
import Perfil from './componentes/Usuario/Perfil'
import ListaObjetos from './componentes/Objetos/ListaObjetos'
import Logout from './componentes/Usuario/Logout'
import AgregarObjeto from './componentes/Objetos/AgregarObjeto'
import { AuthProvider } from './componentes/Middlewares/AuthMiddleware'
import PrivateRoute from './componentes/Middlewares/RutaPrivada'

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Navbar />
          <Switch>
            <PrivateRoute exact path="/objetos">
              <ListaObjetos />
            </PrivateRoute>
            <PrivateRoute exact path="/objetos/reportar">
              <AgregarObjeto />
            </PrivateRoute>
            <PrivateRoute exact path="/perfil">
              <Perfil />
            </PrivateRoute>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/registro">
              <Registro />
            </Route>
            <PrivateRoute exact path="/logout">
              <Logout />
            </PrivateRoute>
            <Route path="/">
              <Landing />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App
