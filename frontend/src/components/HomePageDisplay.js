import React, { Component } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";

const HomePageDisplay = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h2" variant="h2" id="title">
          Welcome to FoodShare
        </Typography>
        <Button
          color="primary"
          variant="contained"
          to="recipe"
          component={Link}
        >
          Create recipe
        </Button>
      </Grid>
    </Grid>
  );
};

export default HomePageDisplay;
