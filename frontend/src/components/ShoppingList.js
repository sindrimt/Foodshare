import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  Divider,
  Typography,
  Container,
  IconButton,
  ListItemText,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import DeleteIcon from "@mui/icons-material/Delete";
import API from "../axios";

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
  const [newList, setNewList] = useState(list);

  const fetchIngredients = async () => {
    const result = await API.get(`cart/`);
    const dataList = result.data;
    console.log(dataList);
    setList(dataList);
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  useEffect(() => {
    fetchIngredients();
  }, [newList]);

  const handleDelete = (id) => {
    console.log(id);
    API.delete("cart/" + id + "/");
    const updatedList = list;
    for (let i = 0; i < updatedList.length; i++) {
      if (updatedList[i].id == id) {
        updatedList.pop(updatedList[i]);
        break;
      }
    }
    setNewList(updatedList);
  };

  return (
    <Container maxWidth="xs" className={classes.container}>
      <Typography className={classes.text} variant="h5">
        Shopping List
      </Typography>
      {/* inform if list is empty */}
      {list.length === 0 ? (
        <Typography>
          You have no items in your shopping list. Add some!
        </Typography>
      ) : (
        <></>
      )}
      <List className={classes.list}>
        {list.map((ingredient) => (
          <div>
            <ListItem
              key={ingredient.id}
              secondaryAction={
                <IconButton onClick={() => handleDelete(ingredient.id)}>
                  <DeleteIcon className={classes.icon} />
                </IconButton>
              }
            >
              <ListItemText
                primary={ingredient.ingredient_detail.name}
                secondary={`${ingredient.ingredient_detail.amount} ${ingredient.ingredient_detail.unit}`}
              />
            </ListItem>
            <Divider light />
          </div>
        ))}
      </List>
    </Container>
  );
};

export default ShoppingList;
