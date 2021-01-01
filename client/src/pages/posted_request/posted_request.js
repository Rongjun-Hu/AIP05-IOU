import React from "react";
import Table from 'react-bootstrap/Table'
import Container from "react-bootstrap/Container";
import { Link } from 'react-router-dom';

class Posted_request extends React.Component {

	constructor() {
		super();
		this.state = {
			postedList: []
		}
	}

	// If status === success, fetch data from the end point based on that token
	async componentDidMount() {
		let response = await fetch('/api/requests/my/posted?token=' +
			localStorage.getItem("token"));
		let json = await response.json();
		if (json.status === "success") {
			console.log(json.data);
			this.setState({
				postedList: json.data
			})
		}
	}

	render() {
		return (
			<Container className="p-3">
				<Table striped bordered hover>
					<thead>
						<tr>
							<th className="text-center">Request</th>
							<th className="text-center">Description</th>
							<th className="text-center">Post Time</th>
							<th className="text-center">Operation</th>
						</tr>
					</thead>
					<tbody>
						{this.state.postedList.map((item, i) =>
							<tr>
								<td>{item.request}</td>
								<td>{item.description}</td>
								<td>{item.postTime}</td>
								<td><Link to={'/detail/' + item._id}>VIEW</Link></td>
							</tr>
						)}
					</tbody>
				</Table>
			</Container>
		);
	}
}

export default Posted_request;
