import React, { useState } from "react";
import { Route, withRouter } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import "./login.css";
import axios from "../../instance";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await axios.post(
        "login",
        JSON.stringify({ email: email, password: password })
      );
      localStorage.setItem("jwt", res.data);

      axios.defaults.headers["auth-token"] = localStorage.getItem("jwt");

      props.history.push("/api/dashboard");
    } catch (err) {
      console.log(err.response.statusText);
      setError(err.response);
    }
  }

  return (
    <div className="Login">
      {error && (
        <Alert
          severity="error"
          onClick={(event) => {
            setError(null);
          }}
        >
          {error.data.meta}
        </Alert>
      )}
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        className="form"
      >
        <TextField
          id="email"
          label="email"
          type="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <TextField
          id="password"
          label="password"
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <Button type="submit" disabled={!validateForm()}>
          Login
        </Button>
        <Route
          render={({ history }) => (
            <Button
              onClick={() => {
                history.push("/register");
              }}
            >
              Register
            </Button>
          )}
        />
      </form>
    </div>
  );
}

export default withRouter(Login);
