import React, { useState } from "react";
import { Route } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import "./login.css";
import axios from "axios";
import { Alert, AlertTitle } from "@material-ui/lab";

// axios.interceptors.request.use(request => {
//     console.log('Starting Request', JSON.stringify(request, null, 2))
//     return request
//   })

export default function (props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(JSON.stringify({ login: email, password: password }));

    try {
      const res = await axios.post(
        "http://localhost:3000/api/login",
        JSON.stringify({ login: email, password: password })
      );
      axios.defaults.headers["auth-token"] = res.data;
      // console.error(res.data);
      props.history.push("/api/dashboard");
    } catch (err) {
      if (err) {
        setError(err);
      }
    }
  }

  return (
    <div className="Login">
      {error && (
        <Alert
          severity="error"
          onClick={(event) => {
            setError(null);
            event.preventDefault();
          }}
        >
          {error.response.data.meta}
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
                history.push("/api/register");
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
