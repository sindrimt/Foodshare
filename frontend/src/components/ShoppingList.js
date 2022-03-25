import React, { useState } from "react";
import {
  Checkbox,
  List,
  ListItem,
  Divider,
  Typography,
  Container,
  FormControlLabel,
  IconButton,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import DeleteIcon from "@mui/icons-material/Delete";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  list: {
    width: "100%",
  },
  icon: {
    position: "absolute",
    right: 0,
  },
  item: {
    width: "100%",
  },
  input: {
    width: "20em",
  },
  addButton: {
    position: "absolute",
    top: "30%",
  },
  text: {
    marginBottom: "1em",
  },
}));

const ShoppingList = () => {
  const classes = useStyles();

  const handleAdd = () => {
    console.log("test");
  };

  const handleDelete = (name) => {
    console.log(name);
    /*API.delete("recipes/" + id + "/").then(
      (message) => setDeletedPost(!deletedPost),
      setIsDeleted(title)
    );*/
  };

  return (
    <Container maxWidth="xs" className={classes.container}>
      <Typography className={classes.text} variant="h5">
        Shopping List
      </Typography>
      <Grid container spacing={2} >
        <Grid item xs={8}>
          <TextField
            className={classes.input}
            label="Ingredient name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            className={classes.addButton}
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleAdd}
          >
            Add
          </Button>
        </Grid>
      </Grid>
      <List className={classes.list}>
        <ListItem>
          <FormControlLabel
            className={classes.item}
            label="Tomater"
            control={<Checkbox /*checked={checked} onClick={handleClick}*/ />}
          />
          <IconButton onClick={() => handleDelete("Tomater")}>
            <DeleteIcon className={classes.icon} />
          </IconButton>
        </ListItem>
        <Divider light />
        <ListItem>
          <FormControlLabel
            className={classes.item}
            label="Melk"
            control={<Checkbox /*checked={checked}*/ />}
          />
          <IconButton onClick={() => handleDelete("Melk")}>
            <DeleteIcon className={classes.icon} />
          </IconButton>
        </ListItem>
        <Divider light />
        <ListItem>
          <FormControlLabel
            className={classes.item}
            label="Ost"
            control={<Checkbox /*checked={checked}*/ />}
          />
          <IconButton onClick={() => handleDelete("Ost")}>
            <DeleteIcon className={classes.icon} />
          </IconButton>
        </ListItem>
      </List>
    </Container>
  );
};

export default ShoppingList;
