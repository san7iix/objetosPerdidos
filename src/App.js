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
import GenerarCodigo from './componentes/Objetos/GenerarCodigo'
import ObjetosEnEspera from './componentes/Objetos/ObjetosEnEspera'
import ReclamarObjeto from './componentes/Objetos/ReclamarObjeto'
import ObjetosReclamados from './componentes/Objetos/ObjetosReclamados'
import AdminRoute from './componentes/Middlewares/RutaAdmin'

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/objetos">
              <ListaObjetos />
            </Route>
            <PrivateRoute exact path="/objetos/reportar">
              <AgregarObjeto />
            </PrivateRoute>
            <PrivateRoute exact path="/generarReclamo/:id">
              <GenerarCodigo />
            </PrivateRoute>
            <PrivateRoute exact path="/objetos/espera">
              <ObjetosEnEspera />
            </PrivateRoute>
            <PrivateRoute exact path="/objetos/reclamados">
              <ObjetosReclamados />
            </PrivateRoute>
            <PrivateRoute exact path="/reclamar/:id">
              <ReclamarObjeto />
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
