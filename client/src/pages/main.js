import React from "react";
import Container from "react-bootstrap/Container";
import { Card, CardGroup } from "react-bootstrap";
import Page from "../components/pagination/page";
import Leaderboard from "../components/Leaderboard/Leaderboard"
import { Link } from "react-router-dom";

class main extends React.Component {
	constructor() {
		super();
		this.state = {
			requestList: [],
			pageNum: 0,
			pageSize: 3,
		};
	}

	/**
	 *
	 * @returns {Promise<void>}
	 */
	async componentDidMount() {
		let response = await fetch(
			"/api/requests/?pageNum=" +
			this.state.pageNum +
			"&pageSize=" +
			this.state.pageSize
		);
		let json = await response.json();
		if (json.status === "success") {
			this.setState({
				requestList: json.data,
			});
		}
	}

	async loadData(val) {
		this.setState({ pageNum: val });
		let response = await fetch(
			"/api/requests/?pageNum=" + val + "&pageSize=" + this.state.pageSize
		);
		let json = await response.json();
		if (json.status === "success") {
			this.setState({
				requestList: json.data,
			});
		}
	}

	render() {
		return (
			<div>
				<Leaderboard />
				<Container className="d-flex flex-row-reverse justify-content-center align-items-center">
					<CardGroup>
						{this.state.requestList.map((item, i) => (
							<Card className="p-3 m-3 border border-dark">
								<Link to={"/detail/" + item._id}>
									<Card.Img
										variant="top"
										src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1704354617,2285391646&fm=26&gp=0.jpg"
									/>
								</Link>
								<Card.Body>
									<Card.Title>{item.request}</Card.Title>
									<Card.Text>{item.description}</Card.Text>
								</Card.Body>
								<Card.Footer>
									<small className="text-muted">{item.postTime}</small>
								</Card.Footer>
							</Card>
						))}
					</CardGroup>
				</Container>

				<Page handlePageNum={this.loadData.bind(this)} />
			</div>
		);
	}
}

export default main;
