import React, { Component } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";

const RecipeCreated = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h2" variant="h2" id="title">
          Recipe succesfully created!
        </Typography>
        <br />
        <Button color="primary" variant="contained" to="/" component={Link}>
          OK
        </Button>
      </Grid>
    </Grid>
  );
};

export default RecipeCreated;
