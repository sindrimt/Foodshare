import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
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
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";

const defaultValues = {
  title: "",
  summary: "",
  content: "",
  prep_time: 0,
};

const Profile = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  const [recipe, setRecipe] = useState({});

  const params = useParams();

  const [isLoading, setLoading] = useState(true);
  const fetchRecipe = () => {
    // GET request i current URL
    axios.get(`/api/recipes/${params.id.toString()}/`).then((response) => {
      setRecipe(response.data);
      console.log(response.data);
      setFormValues({
        title: response.data.title,
        summary: response.data.summary,
        content: response.data.content,
        prep_time: response.data.prep_time,
      });
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formValues);

    axios
      .patch(`/api/recipes/${params.id.toString()}/`, formValues)
      .then((response) => {
        setError(false);
        setOpen(true);
      })
      .catch((error) => {
        setError(true);
        setOpen(true);
      })
      .finally(() => {
        navigate("/me");
      });
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

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
              name="title"
              label="Title"
              type="text"
              defaultValue={recipe.title}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item>
            <TextField
              id="first_name-input"
              name="summary"
              label="Summary"
              type="text"
              defaultValue={recipe.summary}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="last_name-input"
              name="content"
              label="Content"
              fullWidth
              multiline
              type="text"
              defaultValue={recipe.content}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="email-input"
              name="prep_time"
              label="Prep Time"
              type="number"
              defaultValue={recipe.prep_time}
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
              Update Recipe
            </Button>
          </ButtonContainer>
        </Grid>
        {/* Popup component (requires open, setOpen state in parent component, type = ("success" or "error") and message) */}
        <Popup
          open={open}
          setOpen={setOpen}
          type={error ? "error" : "success"}
          message={
            error ? "Error Updating Recipe" : "Recipe Successfully Updated!"
          }
        />
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
