import React from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

class My_request extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [{ request: 123, description: 321, postTime: 3222 }],
    };
  }

  // If status === success, fetch data from that end point based on that token, and display the data in the list
  async componentDidMount() {
    let response = await fetch(
      "/api/requests/my/request?token=" + localStorage.getItem("token")
    );
    let json = await response.json();
    if (json.status === "success") {
      console.log(json.data[0]);
      this.setState({
        list: json.data,
      });
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
            {this.state.list.map((item, i) => (
              <tr>
                <td>{item.request}</td>
                <td>{item.description}</td>
                <td>{item.postTime}</td>
                <td>
                  <Link to={"/detail/" + item._id}>VIEW</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default My_request;
