
const React = require('react');
import Header from './header.jsx';
import Nav from './nav.jsx';
import Login from'./login.jsx';
import {logout} from './../config.jsx';
import {getToken} from './../config.jsx';
import fire from "./../config.jsx";
import Navlog from './navlog.jsx';
import * as  firebase from 'firebase'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
/*global localStorage*/

class Home extends React.Component {
	
 
    constructor () {
        super(); 
        
        this.state = {
            contenido: '',
            titulo: '',
            messages: [],
            auth:""
        }
            this.leer = this.leer.bind(this);
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
       
               const messageRef = firebase.database().ref().child('post');
        messageRef.on('value',(snapshot) =>{
            
            let messages = snapshot.val();
            let newState = [];
            for (let message in messages){
                 newState.push({
                     id: message,
                     titulo: messages[message].titulo,
                     contenido: messages[message].contenido
                 });
            }
            
            this.setState({
               messages: newState 
            });
        });
       
       
    }



    leer(post){
        localStorage.removeItem('titulo');
        localStorage.removeItem('contenido');
        localStorage.setItem("id",post);

        
    }
    

  

    

    
  
	render() {

	    if ( this.state.auth == true){
	        console.log("logeado");
		return (<section>
		
<div>
<Header/>
<Navlog/>


            		  {this.state.messages.map((message) => {
            		     return(
            		  <div className="posts" key={message.id} >
            		       
            		       <a   href="/leerpost"  onClick={ () => this.leer(message.id)}  ><h1>{message.titulo} </h1></a>
            		       <p >{(message.contenido).substr(0, 29) + "...."} </p>

            		  </div>
            		     ) 
            		      
            		  })}

</div>
			
		</section>);
	   
	   
	    }else{
	        
	   		return (<section>
		
<div>
<Header/>
<Nav/>

            		  {this.state.messages.map((message) => {
            		     return(
            		  <div className="posts">
            		       <h1 key={message.id}></h1>
            		       <a href="/leerpost"  onClick={ ()=> this.leer(message.id)} ><h1>{message.titulo} </h1></a>
            		       <p>{(message.contenido).substr(0, 29) + "...."} </p>

            		  </div>
            		     ) 
            		      
            		  })}


</div>
			
		</section>);
	   
	    }
	    
	    
	}
}

export default Home;