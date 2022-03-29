import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import styled from "styled-components";
import Popup from "./Popup";
import { Container, Typography } from "@mui/material";

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
  const [open, setOpen] = useState(false);

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
          navigate("/register/user-created");
          console.log("omg it worked");
          console.log(response);
          setError(false);
          setOpen(true);
        },
        (error) => {
          //console.log(error.response.data);
          console.log("Ikke funker");
          setError(true);
          setOpen(true);
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        alignItems="center"
        justify="center"
        direction="column"
        spacing={2}
      >
        <Grid item xs={12}>
          <Typography variant="h3">Register user</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="name-input"
            name="username"
            label="Username"
            type="text"
            value={formValues.username}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="password-input"
            name="password"
            label="Password"
            type="password"
            value={formValues.password}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="confirm_password-input"
            name="password_confirm"
            label="Confirm Password"
            type="password"
            value={formValues.password_confirm}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="first_name-input"
            name="first_name"
            label="First Name"
            type="text"
            value={formValues.first_name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="last_name-input"
            name="last_name"
            label="Last_name"
            type="text"
            value={formValues.last_name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
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
      <Popup
        open={open}
        setOpen={setOpen}
        type={error ? "error" : "success"}
        message={error ? "Kunne ikke lage bruker" : "Bruker opprettet"}
      />
    </form>
  );
};

const Error = styled.div`
  color: blue;
  padding-top: 12px;
`;

export default RegisterUser;
