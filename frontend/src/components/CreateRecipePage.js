import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const CreateRecipePage = () => {

    return (
    <Grid container spacing={1}>
        <Grid item xs={12} align="center">
            <Typography component="h2" variant="h2" id="title">
                Create recipe
            </Typography>
            <Grid item xs={12} align="center">
                <TextField variant="outlined" label="Recipe title" />
            </Grid>
            <Grid item xs={12} align="center">
                <TextField multiline={true} minRows="5" variant="outlined" label="Recipe description" style = {{width: 500}} />
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="primary" variant="contained" to="created" component={Link} onClick={() => console.log("Create button pressed")}>
                    Create
                </Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" to="/" component={Link}>
                    Back
                </Button>
            </Grid>
        </Grid>
    </Grid>
    );
}

export default CreateRecipePage;