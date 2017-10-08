const React = require('react');
import Header from './header.jsx';
import Nav from './nav.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {auth} from './../config.jsx';
import {saveUser} from './../config.jsx';
import * as firebase from 'firebase';
  
  const card ={
	display:'flex',
	'justifycontent':'center',
	padding:'0px',
	'paddingTop':'16px',
	'flexDirection': 'column',
	'alignItems':'center'
	
}

class Registro extends React.Component {
    
        constructor() {
        super();
        this.state = {
            mail: '',
            nombre: '',
            apellido: '',
            password: ''
        }
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    
	handleSubmit(e) {
        e.preventDefault();
		const mail = this.state.mail;
		const nombre = this.state.nombre;
		const apellido = this.state.apellido;
		const password = this.state.password;
		
		auth(mail, password)
		.then((userRecord) => {
              var	objeto = {
					uid: userRecord.uid ,
					email: userRecord.email,
					name: nombre
				}
				saveUser(objeto);
				userRecord.updateProfile({displayName: nombre+" "+apellido});
            alert('Usuario Creado'); 
            this.props.history.push({pathname:'/'});
			}).catch(function(error) {
			  var errorCode = error.code;
			  var errorMessage = error.message;
       if (errorCode === "auth/email-already-in-use"){
           alert("Correo Electronico en Uso");
       }else{
           if(errorCode === "auth/invalid-email"){
               alert('Correo Electronico Invalido');
           }else{
               
               if (errorCode === "auth/weak-password"){
                   alert("Contraseña muy debil");
               }
           }
           
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
		<MuiThemeProvider>
  <div>
  
  <Header/>
  <Nav/>
<form onSubmit={this.handleSubmit} >
  <div className="login">
  
  	<Card>
		<CardHeader style={card}  textStyle={card} titleStyle={card}  title="Registro"  />
		
    	<CardActions>
      <TextField
      floatingLabelText="Nombre" value={this.state.nombre} onChange={this.handleChange}  name="nombre" type="text"
    /><br />
        <TextField
      
      floatingLabelText="Apellido" value={this.state.apellido} onChange={this.handleChange}  name="apellido" type="text"
    /><br />
            <TextField
      
      floatingLabelText="Correo Electronico" value={this.state.mail} onChange={this.handleChange}  name="mail"  type="mail"
    /><br />
                <TextField
      
      floatingLabelText="Password" value={this.state.password} onChange={this.handleChange}  name="password"  type="password"
    /><br />
        <button className="botonlogin">Aceptar</button>
		</CardActions>
        </Card>
  </div>
  </form>
  </div>
  </MuiThemeProvider>
		</header>);
	}
}

export default Registro;