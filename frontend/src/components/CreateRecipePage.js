import React, { useState, useContext, useEffect } from "react";
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
import Popup from "./Popup";
import IngredientField from "./IngredientField";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useParams } from "react-router";
import axios from "axios";

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

const CreateRecipePage = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [summary, setSummary] = useState("");
  const [prepTime, setPrepTime] = useState(0);
  const [tags, setTags] = useState([]);
  const { loggedIn, setLoggedIn } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [options, setOptions] = useState([]);
  const [ingredients, setIngredients] = useState([{ name: "", amount: 0, unit: "stk." }]);

  //console.log(loggedIn);

  useEffect(() => {
    API.get("/tags/").then((response) => setOptions(response.data.map((tag) => tag.name)));
  }, []);

  function handleCreateButtonPressed(e) {
    e.preventDefault();

    let formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("summary", summary);
    formData.append("prep_time", prepTime);
    //formData.append("tags", JSON.stringify(tags)); // will be added afterwards with ingredients
    formData.append("tags", "[]"); // stupid django requires tags even if null=true

    if (image !== null) {
      formData.append("image", image[0]);
    }

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    // first post recipe with image
    API.post("recipes/", formData).then(
      (response) => {
        console.log(JSON.stringify(response, null, 2));
        const id = response.data.id;
        // then pray to god and patch with ingredients and tags
        API.patch("recipes/" + id + "/", {
          ingredients: ingredients,
          tags: tags,
        }).then(
          (response) => {
            console.log(JSON.stringify(response, null, 2));
            setError(false);
            setOpen(true);
          },
          (error) => {
            console.log(JSON.stringify(error, null, 2));
            setError(true);
            setOpen(true);
          }
        );
      },
      (error) => {
        console.log(JSON.stringify(error, null, 2));
        setError(true);
        setOpen(true);
      }
    );
  }

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: 0, unit: "stk." }]);
  };

  const handleIngredientChange = ({ name, value }, position) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(position, 1, {
      ...ingredients[position],
      [name]: value,
    });
    console.log(name, value);
    setIngredients(newIngredients);
  };

  const handleRemoveIngredient = (id) => {
    const values = [...ingredients];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setIngredients(values);
  };

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
              <IconButton
                disabled={ingredients.length < 1}
                onClick={() => handleRemoveIngredient(ingredients[ingredients.length - 1].name)}
              >
                <RemoveIcon />
              </IconButton>
              <IconButton onClick={handleAddIngredient}>
                <AddIcon />
              </IconButton>
              {ingredients.map((ingredient, index) => (
                <div>
                  <IngredientField
                    key={index}
                    ingredient={ingredient}
                    onInputChange={handleIngredientChange}
                    position={index}
                  />
                </div>
              ))}
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
                options={options}
                defaultValue={[]}
                renderInput={(params) => <TextField {...params} variant="standard" label="Tags" />}
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
              defaultValue={props.image}
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
            Publish recipe
          </Button>
          <Popup
            open={open}
            setOpen={setOpen}
            type={error ? "error" : "success"}
            message={error ? "Error Creating Recipe!" : "Recipe Created!"}
          />
        </form>
      </div>
    </Container>
  );
};

export default CreateRecipePage;
