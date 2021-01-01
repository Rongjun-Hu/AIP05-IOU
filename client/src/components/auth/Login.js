import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Label,
  Form,
  FormGroup,
  NavLink,
  Alert,
} from "reactstrap";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Login extends Component {
  // default state
  state = {
    modal: false,
    email: "",
    password: "",
    message: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for login error
      if (error.id === "LOGIN_FAIL") {
        this.setState({ message: error.message.message });
      } else {
        this.setState({ message: null });
      }
    }

    // If authenticated - then close modal
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  // set the input value
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Form submit
  onSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    const user = {
      email,
      password,
    };

    // Attempt to login
    this.props.login(user);
  };

  // From reactstrap
  toggle = () => {
    // clearErrors function
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal,
    });
  };

  // Modal from reactstrap
  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Login
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            {this.state.message ? (
              <Alert color="danger">{this.state.message}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Email"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Login
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
