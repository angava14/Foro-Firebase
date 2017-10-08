
const React = require('react');
const Header = require('./header.jsx');
const Nav = require('./nav.jsx');
const Login = require('./login.jsx');


class Main extends React.Component {
	render() {
		return (<main>
		<Nav />
		<Login />
		</main>);
	}
}

export default Main;


