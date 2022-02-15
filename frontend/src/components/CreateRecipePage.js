import React, { Component, useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";


const CreateRecipePage = () => {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    function handleCreateButtonPressed(e) {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            content,
          }),
        };
        fetch("/api/recipes/", requestOptions)
          .then((response) => response.json())
          .then((data) => console.log(data));
      }

    return (
    <Grid container spacing={1}>
        <Grid item xs={12} align="center">
            <Typography component="h2" variant="h2" id="title">
                Create recipe
            </Typography>
            <Grid item xs={12} align="center">
                <TextField variant="outlined" label="Recipe title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </Grid>
            <Grid item xs={12} align="center">
                <TextField multiline={true} minRows="5" variant="outlined" label="Recipe description" value={content} onChange={(e) => setContent(e.target.value)} style = {{width: 500}} />
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="primary" variant="contained" to="created" component={Link} onClick={() => handleCreateButtonPressed()}>
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