import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
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
