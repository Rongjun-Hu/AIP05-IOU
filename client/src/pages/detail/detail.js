import React, { useState } from 'react';
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import http from "axios";
import Pop from "./modal";


class Detail extends React.Component {

	constructor() {
		super();
		this.state = {
			requestDetail: {},
			rewards: [],
			show: false
		}
	}

	async componentDidMount() {
		let requestID = this.props.match.params.id;
		// console.log('id:' + this.props.match.params.id);
		let response = await fetch('/api/requests/' + requestID);
		let json = await response.json();
		if (json.status === "success") {
			// console.log(json.data);
			this.setState({
				requestDetail: json.data[0],
				rewards: json.data[0].reward
			})
		}
	}

	acceptRequest() {
		http.patch('/api/requests/acceptrequest', {
			requestId: this.state.requestDetail._id,
			token: localStorage.getItem("token")
		}).then(function (response) {
			// console.log(response);
			alert(response.data.data);
		})
	}

	deleteReward() {
		http.delete('/api/requests/deletereward?requestId=' +
			this.state.requestDetail._id + "&token=" +
			localStorage.getItem("token"))
			.then(function (response) {
				// console.log(response);
				alert(response.data.data);
				window.location.reload(true);
			})
	}

	render() {
		return (
			<div>
				<Container className="p-3">
					<br />
					<Row>
						<Col xs={6} md={4} className="m-auto">
							<Image src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1704354617,2285391646&fm=26&gp=0.jpg" fluid />
						</Col>
					</Row>
					<br />
					<Row >
						<Col className="text-center">
							<h1>
								{this.state.requestDetail.request} <Badge variant="success">New</Badge>
							</h1>
						</Col>
					</Row>
					<br />
					<Row>
						<Col className="text-center">
							<p>
								{this.state.requestDetail.description}
							</p>
						</Col>
					</Row>
					<br />
					<Row>
						<Col className="text-right">
							<Button variant="primary" href="#" onClick={() => this.deleteReward()} className="btn btn-primary btn-lg">Delete my reward</Button>
						</Col>
					</Row>
					<br />
					<Row>
						<Col>
							<Table striped bordered hover>
								<thead>
									<tr>
										<th className="text-center">No.</th>
										<th className="text-center">Username</th>
										<th className="text-center">Reward</th>
									</tr>
								</thead>
								<tbody>
									{
										this.state.rewards.map((item, index) =>
											<tr key={index}>
												<td>{index + 1}</td>
												<td>{item.userId}</td>
												<td>{item.name}</td>
											</tr>
										)
									}
								</tbody>
							</Table>
						</Col>
					</Row>
					<Row>
						<Pop id={this.state.requestDetail._id} />
						<Col className="text-right">
							<Button variant="primary" href="#" onClick={() => this.acceptRequest()} className="btn btn-primary btn-lg">Accept</Button>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

export default Detail;
