import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import styled from "styled-components";
import { MdTaskAlt, MdClose } from "react-icons/md";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const defaultValues = {
  username: "",
  first_name: "",
  last_name: "",
  email: "",
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Profile = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const url = "/api/accounts/profile/";
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        console.log("suksess");
        console.log(response);
        setOpen(true);
      })
      .catch((error) => {
        console.log("error");
        console.log(error.message);
        //TODO Legg til Error melding
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
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Profile Updated!
          </Alert>
        </Snackbar>
      </form>
    </>
  );
};

const Accepted = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  bottom: 15px;
  left: 10px;
  width: 320px;
  border-radius: 5px;
  height: 60px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  overflow: hidden;
`;

const Icon = styled.div`
  position: relative;
  padding-left: 10px;
  display: flex;
  align-items: center;
  padding-right: 8px;
`;
const Close = styled.section`
  position: absolute;
  height: 65%;
  right: 22px;
  align-items: center;
  border-left: 1px solid gray;
`;

const LeftLine = styled.div`
  position: absolute;
  display: flex;
  height: 100%;
  width: 5px;
  left: 0;
  background-color: #41c057;
`;

export default Profile;
