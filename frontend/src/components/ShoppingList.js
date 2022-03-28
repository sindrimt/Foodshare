import React, { useState, useEffect } from "react";
import {
  Checkbox,
  List,
  ListItem,
  Divider,
  Typography,
  Container,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

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

  const [list, setList] = useState([]);

  const fetchIngredients = async () => {
    const result = await axios.get(`/api/cart/`);
    const dataList = result.data;
    console.log(dataList);
    setList(dataList);
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  const handleDelete = (id) => {
    console.log(id);
    axios.delete("/api/cart/" + id + "/");
    fetchIngredients();
  };

  return (
    <Container maxWidth="xs" className={classes.container}>
      <Typography className={classes.text} variant="h5">
        Shopping List
      </Typography>
      <List className={classes.list}>
        {list.map((ingredient) => (
          <div>
            <ListItem>
              <FormControlLabel
                className={classes.item}
                label={ingredient.ingredient_detail.name}
                control={<Checkbox />}
              />
              <IconButton onClick={() => handleDelete(ingredient.id)}>
                <DeleteIcon className={classes.icon} />
              </IconButton>
            </ListItem>
            <Divider light />
          </div>
        ))}
      </List>
    </Container>
  );
};

export default ShoppingList;
