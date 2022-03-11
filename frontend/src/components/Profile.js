import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Button from "@mui/material/Button";
import Popup from "./Popup";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDelete = () => {
    setOpenDialog(false);
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
          <ButtonContainer>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleSubmit}
            >
              Update Profile
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleClickOpenDialog}
            >
              Delete Profile
            </Button>
          </ButtonContainer>
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
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            You are about to <span style={{ color: "red" }}>Delete</span> your
            Profile
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete your profile?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Disagree</Button>
            <Button onClick={handleDelete} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export default Profile;
