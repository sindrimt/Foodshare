import React, { Component } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const UserCreated = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
      <br />
      <br />
        <Typography component="h3" variant="h3" id="title">
          Bruker opprettet!
        </Typography>
        <br />
        <br />
        <br />
        <br />
        <Button color="primary" variant="outlined" to="/login" component={Link}>
          Ta meg til login!
        </Button>
        <br />
        <br />
        <Button color="primary" variant="outlined" to="/" component={Link}>
          Ta meg til oppskriftene!
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserCreated;
