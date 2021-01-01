import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import store from './store';
import Main from './pages/main';
import Detail from "./pages/detail/detail";
import Favor from './pages/owes'
import "bootstrap/dist/css/bootstrap.min.css";
import { loadUser } from './actions/authActions'
import { Component } from 'react';
import PrivateRoute from './components/PrivateRoute'
import MyRequest from "./pages/my_request/my_request"
import PostedRequest from "./pages/posted_request/posted_request"


class App extends Component {

	componentDidMount() {
		store.dispatch(loadUser())
	}

	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<AppNavbar />
					<Route path='/' exact component={Main} />
					<Route path='/home/:num&:size' exact component={Main} />
					<Route path='/detail/:id' exact component={Detail} />
					<PrivateRoute path='/owes/:id' exact component={Favor} />
					<PrivateRoute path='/my_request' exact component={MyRequest} />
					<PrivateRoute path='/posted_request' exact component={PostedRequest} />
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
