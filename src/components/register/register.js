import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import "./register.css";

export default function (props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [born, setBorn] = useState("");
  const [error, setError] = useState(null);

  function validateForm() {
    return (
      email.length > 0 &&
      password.length > 0 &&
      name.length > 0 &&
      lastName.length > 0 &&
      born.length > 0
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/register",
        JSON.stringify({
          email: email,
          password: password,
          name: name,
          lastName: lastName,
          born: born,
        })
      );

      props.history.push("/login");
    } catch (err) {
      if (err) {
        console.error(err.response.data.body.details[0].message);
        setError(err.response.data.body.details[0].message);
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
          {error}
        </Alert>
      )}
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        className="form"
      >
        <TextField
          id="name"
          label="name"
          type="name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <TextField
          id="lastName"
          label="lastName"
          type="lastName"
          onChange={(event) => {
            setLastName(event.target.value);
          }}
        />
        <TextField
          id="born"
          label="born"
          type="born"
          onChange={(event) => {
            setBorn(event.target.value);
          }}
        />
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
          Regsiter
        </Button>
      </form>
    </div>
  );
}
