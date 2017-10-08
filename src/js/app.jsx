const Style = require('../css/style.scss');
import Main from'./Components/main.jsx';
import Login from'./Components/login.jsx';
import Nav from'./Components/nav.jsx';
import Home from'./Components/home.jsx';
import Post from'./Components/post.jsx';
import Leerpost from'./Components/leerpost.jsx';
import Registro from'./Components/registro.jsx';
import Perfil from'./Components/perfil.jsx';
import React from 'react'
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

  
    
 ReactDOM.render((
  <Router>
  <div>
    <Route exact path="/"  component={Home} />
    <Route exact path="/registro"  component={Registro} />
    <Route exact path="/login"  component={Login} />
    <Route exact path="/perfil"  component={Perfil} />
    <Route exact path="/post"  component={Post} />
    <Route exact path="/leerpost"  component={Leerpost} />
    </div>
  </Router>
), document.getElementById('app'));