
const React = require('react');
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import { BrowserRouter as Router } from 'react-router-dom'
import ContentInbox from 'material-ui/svg-icons/social/person';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import {logout} from './../config.jsx';

const horizontal = {
	
  display: 'flex',
  flexDirection: 'row',
  padding: 0,
 'marginBottom':'50px',
   background: '#08ABFC',
  color: 'white',
};

class Nav extends React.Component {
        constructor () {
        super();

    }
     


	render() {
		return (<section>

<div >
<MuiThemeProvider>

<List style={horizontal}>
      <ListItem primaryText="Iniciar Sesion" leftIcon={<ContentInbox />} href="/login" />
       <ListItem primaryText="Registro" leftIcon={<ContentInbox />} href="/registro" />
       
</List>

</MuiThemeProvider>
</div>

				</section>);
	}
}

export default Nav;
