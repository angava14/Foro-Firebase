
const React = require('react');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
const Header = require('./header.jsx');
import TextField from 'material-ui/TextField';
const Navlog = require('./navlog.jsx');
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { BrowserRouter as Router } from 'react-router-dom'
import {savePost} from './../config.jsx';
import {getToken} from './../config.jsx';
import {verify} from './../config.jsx';
import Dialog from 'material-ui/Dialog';
import * as  firebase from 'firebase'

const card ={
	display:'flex',
	'justifyContent':'center',
	padding:'0px',
	'paddingTop':'16px',
}

class Nav extends React.Component {
    constructor() {
        super();
        
        this.state = {
            titulo: '',
            descripcion: '',
            auth: ""
            
        }
        
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
this.auth = true;
  } else {
this.auth = false
  }
  
});
        
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);

}

componentWillMount(){
        var padre = this;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
padre.setState({ auth: true});
 console.log(padre.state.auth);
  } else {
padre.setState({ auth: false});
 console.log(padre.state.auth);
  }
});   
       
    }
     
     	handleSubmit(e) {
        e.preventDefault();
        
		const titulo = this.state.titulo;
		const descripcion = this.state.descripcion;
		const token = getToken();
		const redirect = this.props;
		 const objeto ={
		     titulo: titulo ,
		     contenido: descripcion ,
		     uid:  token.uid
		 }
		savePost(objeto);
        redirect.history.push({pathname:'/'})

	}
     
      handleChange(e){
        
        this.setState({
            [e.target.name]: e.target.value
            
        });
    }


	    

	render() {
	  
		return (<section>

<div >
<Header/>
<Navlog/>
<MuiThemeProvider>
<div className="newpost">
    
    <form onSubmit={this.handleSubmit} className="tam"  >
      <Card  >
   <CardHeader   title="Nuevo Post"  style={card}  textStyle={card} titleStyle={card} />/>
    <CardActions>
    <TextField fullWidth='true'
    value={this.state.titulo} onChange={  this.handleChange}  name="titulo" 
      floatingLabelText="Titulo"
    /><br />
<TextField  fullWidth='true'
    value={this.state.descripcion} onChange={  this.handleChange}  name="descripcion" 
      floatingLabelText="Descripcion"
      multiLine={true}
      rows={5}
    />
    <br/>
    <button className="botonlogin">Aceptar </button>
    </CardActions>

  </Card>
 </form> 
    </div>
</MuiThemeProvider>
</div>

				</section>);
				
	}
}

export default Nav;