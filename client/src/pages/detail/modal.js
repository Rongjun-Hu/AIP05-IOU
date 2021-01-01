import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import http from "axios";

function Pop(props) {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const add = () => {
		let reward = document.getElementById("input").value;
		http.post('/api/requests/addreward', {
			requestId: props.id,
			token: localStorage.getItem("token"),
			reward: reward
		}).then(function (response) {
			alert(response.data.data);
			setShow(false);
			window.location.reload();
		})
	};

	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				Add Reward
            </Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add a reward to request</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text id="inputGroup-sizing-default">Reward Name:</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl
							aria-label="Default"
							aria-describedby="inputGroup-sizing-default"
							id="input"
						/>
					</InputGroup>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={add} >
						Add
                    </Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default Pop
