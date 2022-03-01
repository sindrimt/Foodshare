import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import styled from "styled-components";

const defaultValues = {
  password: "",
  username: "",
  first_name: "",
  last_name: "",
  email: "",
  password_confirm: "",
};
const RegisterUser = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const url = "/api/accounts/register/";
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);

    if (formValues.password != formValues.password_confirm) {
      console.log("Passwords are not the same!");
      return;
    } else {
      axios.post(url, formValues).then(
        (response) => {
          navigate("user-created");
          console.log("omg it worked");
          console.log(response);
        },
        (error) => {
          setError(true);
          console.log(error);
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" justify="center" direction="column">
        {error ? <Error>Not Accepted</Error> : ""}

        <Grid item>
          <TextField
            id="name-input"
            name="username"
            label="Username"
            type="text"
            value={formValues.username}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="password-input"
            name="password"
            label="Password"
            type="password"
            value={formValues.password}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="confirm_password-input"
            name="password_confirm"
            label="Confirm Password"
            type="password"
            value={formValues.password_confirm}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="first_name-input"
            name="first_name"
            label="First Name"
            type="text"
            value={formValues.first_name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="last_name-input"
            name="last_name"
            label="Last_name"
            type="text"
            value={formValues.last_name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="email-input"
            name="email"
            label="Email"
            type="text"
            value={formValues.email}
            onChange={handleInputChange}
          />
        </Grid>

        <br />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Grid>
    </form>
  );
};

const Error = styled.div`
  color: red;
  padding-top: 12px;
`;

export default RegisterUser;
