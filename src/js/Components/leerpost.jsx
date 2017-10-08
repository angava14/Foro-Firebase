
const React = require('react');
import { BrowserRouter as Router } from 'react-router-dom'
import Navlog from './navlog.jsx';
import Nav from './nav.jsx';
import Header from './header.jsx';
import TextField from 'material-ui/TextField';
import {getToken} from './../config.jsx';
import {savecomment} from './../config.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import * as  firebase from 'firebase';
/*global localStorage*/


class Leerpost extends React.Component {
 constructor () {
        super();
    this.state = { titulo: undefined , 
    contenido:undefined ,  
    newcomment: '',
    auth:'',
    comentario:'',
    autor:'',
    messages:[],
    nombre:""
    };
    this.handleChange = this.handleChange.bind(this); 
    this.handleSubmit= this.handleSubmit.bind(this); 
}


componentWillMount(){
    
    
         let newState = [];
         this.idpost = localStorage.getItem("id");
         var ref = firebase.database().ref("post/"+ this.idpost);
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
        
        
         ref.orderByKey().equalTo("titulo").on("child_added", function(data) {
         var titu = data.val()
         padre.setState({titulo:titu});
          document.title = padre.state.titulo;
          });
          
      ref.orderByKey().equalTo("contenido").on("child_added", function(data) {
      var cont =  data.val()
      padre.setState({contenido:cont});
       
         
      });  

      
                     const messageRef = firebase.database().ref().child('post/'+this.idpost+"/comentarios");
        messageRef.on('value',(snapshot) =>{
            
            let messages = snapshot.val();
            let newState = [];
            for (let message in messages){

      newState.push({
                     id: message,
                     autor: messages[message].autor,
                     comentario: messages[message].comentario
            });  

                 
            }
            
            this.setState({
               messages: newState
            });
        
            
        });

}

     	handleSubmit(e) {
        e.preventDefault();
        const nc = this.state.newcomment;
        const token = getToken();
    const post = localStorage.getItem('id'); 
    const comment = {
          comentario: nc,
          autor: token.displayName,
        }
        
        savecomment( post,comment) ;
        alert("Su comentario ha sido agregado");


	}

    handleChange(e){
        
        this.setState({
            [e.target.name]: e.target.value
            
        });
    }
    
	render() {
		return (<section>
{ this.state.auth ?
<div >

<Header/>
<Navlog/>


<MuiThemeProvider>
<div>
 <Card className="leerpost"  >
   <CardHeader   title={this.state.titulo}   />
    <CardActions>
<p  >{this.state.contenido}</p>
    </CardActions>


</Card>
  
          	 {this.state.messages.map(item=>{
    	            return (
    	            <div  key={item.id}>
    	            <Card className="leerpost" >

    	            <CardHeader
    	                title={item.autor}
    	                
                    
                    />
    	            <CardText>{item.comentario}</CardText>
    	            </Card>
    	            </div>
    	           )
    	        })
    	      }
  
  

  <form  onSubmit={this.handleSubmit} >
  <Card className="leerpost" >
<CardHeader   title="Agregar Comentario"   />
    <CardActions>
<TextField  fullWidth={true}
    value={this.state.newcomment} onChange={ this.handleChange}  name="newcomment" 
      
      multiLine={true}
      rows={5}
    />





        <button className="botonlogin">Comentar </button>
    </CardActions>
    </Card>
</form>
</div>
</MuiThemeProvider>

</div>
 :
 <div>
 
  <Header/>
<Nav/>


<MuiThemeProvider>
<div>
 <Card className="leerpost"  >
   <CardHeader   title={this.state.titulo}   />
    <CardActions>
<p  >{this.state.contenido}</p>
    </CardActions>


</Card>
            	 {this.state.messages.map(item=>{
    	            return (
    	            <div  key={item.id}>
    	            <Card className="leerpost" >

    	            <CardHeader
    	                title={item.autor}
    	                
                    
                    />
    	            <CardText>{item.comentario}</CardText>
    	            </Card>
    	            </div>
    	           )
    	        })
    	      }
  
  
    <h1> Debe estar autenticado para comentar</h1>
    </div>
    </MuiThemeProvider>
    </div>
}





				</section>);
	}
}

export default Leerpost;
