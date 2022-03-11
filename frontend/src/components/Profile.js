import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Button from "@mui/material/Button";
import Popup from "./Popup";
import styled from "styled-components";
import { MdBookmarkBorder } from "react-icons/md";
import { Link } from "react-router-dom";

const defaultValues = {
  username: "",
  first_name: "",
  last_name: "",
  email: "",
};

const Profile = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const url = "/api/accounts/profile/";
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);

    axios
      .patch(url, formValues)
      .then((response) => {
        setError(false);
        setOpen(true);
      })
      .catch((error) => {
        setError(true);
        setOpen(true);
      });
  };
  return (
    <>
      <br />
      <form onSubmit={handleSubmit}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="column"
          spacing={2}
        >
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
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleSubmit}
          >
            Update Profile
          </Button>
        </Grid>
        {/* Popup component (requires open, setOpen state in parent component, type = ("success" or "error") and message) */}
        <Popup
          open={open}
          setOpen={setOpen}
          type={error ? "error" : "success"}
          message={
            error ? "Error Updating Profile" : "Profile Successfully Updated!"
          }
        />
      </form>
      <Link to="liked-recipes">
        <SavedIconContainer>
          <MdBookmarkBorder size={45} />
        </SavedIconContainer>
      </Link>
    </>
  );
};

const SavedIconContainer = styled.div`
  position: fixed;
  bottom: 40px;
  right: 40px;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
    transition: 0.25s all ease-in-out;
    background: lightgrey;
    padding: 5px;
  }
`;

export default Profile;
