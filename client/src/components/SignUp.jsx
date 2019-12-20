import React, { useState } from "react";

import { Card, CardBody, CardTitle, Alert, Form, FormGroup, Label, Input, Button } from "reactstrap";

import { Link } from "react-router-dom";

import axios from "axios";

function Login(props) {
  const [signup, setSignup] = useState({
    username: "",
    password: "",
    repeatPassword: "",
  });
  const [error, setError] = useState(null);

  function handleLogin(e) {
    e.preventDefault();

    if (signup.password !== signup.repeatPassword) {
      setError("Passwords do not match");
    } else {
      axios
        .post("http://localhost:3300/api/auth/register", { username: signup.username, password: signup.password })
        .then((res) => {
          props.history.push("/login");
        })
        .catch((error) => {
          setError("Something went wrong... Try again later.");
        });
    }
  }

  const handleChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-form">
      <Card>
        <CardTitle>Sign Up!</CardTitle>
        {error ? <Alert color="danger">{error}</Alert> : null}
        <CardBody>
          <Form onSubmit={handleLogin}>
            <FormGroup className="login-inputs">
              <Label>
                Username
                <Input type="text" name="username" onChange={handleChange} />
              </Label>
              <Label>
                Password
                <Input type="password" name="password" onChange={handleChange} />
              </Label>
              <Label>
                Repeat Password
                <Input type="password" name="repeatPassword" onChange={handleChange} />
              </Label>
            </FormGroup>
            <p>
              Already a member? <Link to="/login">Login</Link>
            </p>
            <Button color="primary" type="submit">
              Submit
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

export default Login;
