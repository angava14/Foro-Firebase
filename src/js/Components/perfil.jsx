
const React = require('react');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import { BrowserRouter as Router } from 'react-router-dom'
import {getToken} from './../config.jsx';
const Header = require('./header.jsx');
const Navlog = require('./navlog.jsx');
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
const horizontal = {
	
  display: 'flex',
  flexDirection: 'row',
  padding: 0,
 'marginBottom':'50px',
};

class Perfil extends React.Component {
        constructor () {
        super();
            this.state = {
            nombre: '',
            email: '',
            auth: ""
            
        }

       
    }
     
componentWillMount(){
    var token = getToken();
    var name = token.displayName ;
    var mail = token.email;
    this.setState({
        nombre: name,
        email: mail
    });
}

	render() {
		return (<section>

<div >
<Header/>
<Navlog/>
<MuiThemeProvider>
<div className="newpost">
    
    
      <Card  >
   <CardHeader   title="Mi Perfil"  />/>
    <CardActions>
     <h1>{ "Nombre"+ this.state.nombre }</h1>
     <h1>{ "Correo"+ this.state.email }</h1>
    </CardActions>

  </Card>

    </div>
</MuiThemeProvider>

</div>

				</section>);
	}
}

export default Perfil;
