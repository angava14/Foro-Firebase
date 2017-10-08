
const React = require('react');
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import { BrowserRouter as Router } from 'react-router-dom'
import ContentInbox from 'material-ui/svg-icons/social/person';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Perfil from 'material-ui/svg-icons/editor/insert-emoticon';
import Home from 'material-ui/svg-icons/action/home'
import Formato from 'material-ui/svg-icons/editor/format-align-center';
import LO from 'material-ui/svg-icons/action/power-settings-new';
import {logout} from './../config.jsx';

const horizontal = {
	
  display: 'flex',
  flexDirection: 'row',
  padding: 0,
 'marginBottom':'50px',
  background: '#08ABFC',
  color: 'white',
};

class Navlog extends React.Component {
    
        constructor () {
        super();
        this.lout = this.lout.bind(this);

    }
     


	    
    lout() {
    	logout();
     	
    }
    
	render() {
		return (<section>

<div >
<MuiThemeProvider>

<List style={horizontal}>
<ListItem primaryText="Inicio"  href="/" leftIcon={<Home/>}/>
      <ListItem primaryText="Mi Perfil"  href="/perfil" leftIcon={<Perfil/>} />
       <ListItem primaryText="Nuevo Post"  href="/post" leftIcon={<Formato/>}/>
       <ListItem primaryText="Logout"  onClick={this.lout}  href="/" leftIcon={<LO/>}/>
</List>

</MuiThemeProvider>
</div>

				</section>);
	}
}

export default Navlog;