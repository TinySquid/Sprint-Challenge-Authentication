import React, { useState } from "react";

import { Card, CardBody, CardTitle, Alert, Form, FormGroup, Label, Input, Button } from "reactstrap";

import { Link } from "react-router-dom";

import axios from "axios";

function Login(props) {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);

  function handleLogin(e) {
    e.preventDefault();
    console.log("Logging in...", login);
    axios
      .post("http://localhost:3300/api/auth/login", login)
      .then((res) => {
        window.localStorage.setItem("token", res.data.token);
        props.history.push("/jokes");
      })
      .catch((error) => {
        setError("Invalid username / password");
      });
  }

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-form">
      <Card>
        <CardTitle>Login</CardTitle>
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
            </FormGroup>
            <p>
              Not a member? <Link to="/signup">Sign up</Link>
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
