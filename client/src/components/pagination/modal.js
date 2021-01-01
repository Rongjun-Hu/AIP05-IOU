import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import http from "axios";

function Pop(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const add = () => {
    let request = document.getElementById("req").value;
    let desc = document.getElementById("desc").value;
    let reward = document.getElementById("rew").value;
    http
      .post("/api/requests/", {
        token: localStorage.getItem("token"),
        reward: reward,
        request: request,
        description: desc,
      })
      .then(function (response) {
        alert(response.data.data);
        setShow(false);
        window.location.reload(true);
      });
  };

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Post a request
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a reward to request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-default">
                Request Name:
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl id="req" />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-default">
                Description:
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl id="desc" />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-default">
                Reward Name:
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl id="rew" />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={add}>
            Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Pop;
