
const React = require('react');
import Header from './header.jsx';
import Nav from "./nav.jsx";
import { BrowserRouter as Router } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import {login} from './../config.jsx';
import * as firebase from 'firebase';
const card ={
	display:'flex',
	'justifyContent':'center',
	padding:'0px',
	'paddingTop':'16px',
}


   

class Login extends React.Component {
	
    constructor() {
        super();

        this.state = {
            mail: '',
            password: ''
            
        }
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);

        
    }
	
	handleSubmit(e) {
        e.preventDefault();
		const mail = this.state.mail;
		const password = this.state.password;
		const redirect = this;
	login(mail, password)
			.then((userRecord) => {
		redirect.props.history.push({pathname:'/'})
  
			})
			.catch((error) => {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  
			  if (errorCode === 'auth/wrong-password') {
			    alert('Contraseña incorrecta');
			  } else {
			    alert("Credenciales incorrectas, intente nuevamente");
			  }
			});
	}




	
        handleChange(e){
        
        this.setState({
            [e.target.name]: e.target.value
            
        });
    }
	
	render() {
		return (<header>
		<div>

<Header/>
<Nav/>
<MuiThemeProvider>
		<div className="login">
		<form    onSubmit={this.handleSubmit} >
		<Card  >
		<CardHeader style={card}  textStyle={card} titleStyle={card}  title="Iniciar Sesion"  />
		
    	<CardActions>

        <TextField
       value={this.state.mail} onChange={this.handleChange}  name="mail"    type="email" 
      floatingLabelText="Ingrese Correo Electronico"
    /><br />
    <TextField
       value={this.state.password} onChange={this.handleChange}  name="password"    type="password" 
      floatingLabelText="Ingrese Contraseña"
    /><br />
        
		<button className="botonlogin">Aceptar</button>
		<br/>
		</CardActions>
        </Card>
        </form>
		</div>
</MuiThemeProvider>
</div>
		</header>);
	}
}

export default Login;
