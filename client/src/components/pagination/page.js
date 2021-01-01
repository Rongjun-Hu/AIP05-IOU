import React, { useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import { Row, Col } from "react-bootstrap";
import http from "axios";
import Button from "react-bootstrap/Button";

class Page extends React.Component {
  constructor() {
    super();
    this.state = {
      pageNum: 1,
    };
  }
  handlePrev() {
    if (this.state.pageNum > 0) {
      this.setState({ pageNum: this.state.pageNum - 1 });
    } else {
      this.setState({ pageNum: 0 });
    }
    this.props.handlePageNum(this.state.pageNum);
  }

  handleNext() {
    this.setState({ pageNum: this.state.pageNum + 1 });
    this.props.handlePageNum(this.state.pageNum);
  }

  // const handleNext = () => {
  // 	setPageNum(pageNum+1);
  // 	console.log(pageNum);
  // 	this.props.handlePageNum(pageNum);
  // }

  render() {
    return (
      <Row className="justify-content-md-center mt-3" xs={2}>
        <Col md="auto">
          <Pagination>
            <Pagination.Prev onClick={() => this.handlePrev()} />
            <Pagination.Next onClick={() => this.handleNext()} />
          </Pagination>
        </Col>
      </Row>
    );
  }
}

export default Page;
