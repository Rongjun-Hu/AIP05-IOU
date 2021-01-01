import React, { Component, Fragment } from 'react'
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	Container,
} from "reactstrap";
import Login from './auth/Login';
import Register from './auth/Register';
import Logout from './auth/Logout'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import NavDropdown from "react-bootstrap/NavDropdown";
import Pop from "./pagination/modal";

class AppNavbar extends Component {
	state = {
		isOpen: false
	}

	static propTypes = {
		auth: PropTypes.object.isRequired
	}

	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen
		})
	}


	render() {
		const { isAuthenticated, user } = this.props.auth

		// If user logged in, show this links
		const authLinks = (
			<Fragment>
				<NavDropdown title={user ? `Welcome ${user.username}` : ''} id="basic-nav-dropdown">
					<NavDropdown.Item href="/my_request">My Request</NavDropdown.Item>
					<NavDropdown.Item href="/posted_request">My Posted Request</NavDropdown.Item>
					<NavDropdown.Item href="#" ><Pop /></NavDropdown.Item>
				</NavDropdown>
				<NavItem>
					<NavLink href={user ? '/owes/' + user.username : '/owes'}>
						Favor
					</NavLink>
				</NavItem>
				<NavItem>
					<Logout />
				</NavItem>
			</Fragment>
		)

		// If user is not login, show this links
		const guestLinks = (
			<Fragment>
				<NavItem>
					<Register />
				</NavItem>
				<NavItem>
					<Login />
				</NavItem>
			</Fragment>
		)

		return (
			<div>
				<Navbar color='dark' dark expand='sm' className='mb-5'>
					<Container>
						<NavbarBrand href='/'>IOU</NavbarBrand>
						<NavbarToggler onClick={this.toggle} />
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className='ml-auto' navbar>
								{isAuthenticated ? authLinks : guestLinks}
							</Nav>
						</Collapse>
					</Container>
				</Navbar>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	auth: state.auth
})


export default connect(mapStateToProps, null)(AppNavbar);
