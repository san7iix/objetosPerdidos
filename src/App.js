import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Landing from './componentes/Generales/Landing'
import Navbar from './componentes/Generales/Navbar'
import Login from './componentes/Usuario/Login'
import Registro from './componentes/Usuario/Registro'
import Perfil from './componentes/Usuario/Perfil'
import ListaObjetos from './componentes/Objetos/ListaObjetos'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/objetos">
            <ListaObjetos />
          </Route>
          <Route exact path="/perfil">
            <Perfil />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/registro">
            <Registro />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
