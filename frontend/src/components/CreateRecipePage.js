import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Autocomplete from "@mui/material/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import API from "../axios";
import { UserContext } from "../context/UserContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const CreateRecipePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
<<<<<<< HEAD
  const [summary, setSummary] = useState("");
  const [prepTime, setPrepTime] = useState(0);
  const [tags, setTags] = useState([]);
=======
  const { loggedIn, setLoggedIn } = useContext(UserContext);
  console.log(loggedIn);
>>>>>>> Development

  const navigate = useNavigate();

  function handleCreateButtonPressed(e) {
    e.preventDefault();

    let formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("summary", summary);
    formData.append("prep_time", prepTime);
    formData.append("tags", JSON.stringify(tags));

    if (image !== null) {
      formData.append("image", image[0]);
    }

    API.post("recipes/", formData)
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      )
      .then(navigate("created"));
  }

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create new recipe
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Recipe title"
                name="title"
                autoComplete="title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="summary"
                label="Summary"
                name="summary"
                autoComplete="summary"
                onChange={(e) => setSummary(e.target.value)}
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="content"
                label="Content"
                name="content"
                autoComplete="content"
                onChange={(e) => setContent(e.target.value)}
                multiline
                rows={10}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                type="number"
                fullWidth
                id="prepTime"
                label="Preperation time"
                name="prepTime"
                autoComplete="prepTime"
                onChange={(e) => setPrepTime(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                multiple
                freeSolo
                id="tags"
                options={["Julemat"]}
                defaultValue={[]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Tags"
                    placeholder="Frokost"
                  />
                )}
                onChange={(e, value) => setTags(value)}
              />
            </Grid>
            <input
              accept="image/*"
              className={classes.input}
              id="post-image"
              onChange={(e) => {
                setImage(e.target.files);
                console.log(e.target.files);
              }}
              name="image"
              type="file"
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleCreateButtonPressed}
          >
            Create Post
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default CreateRecipePage;
