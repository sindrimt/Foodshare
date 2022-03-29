import React from "react";
import Button from "@mui/material/Button";
import API from "../axios";

const AddIngredientsToShopping = (props) => {
  const handleAdd = () => {
    console.log("add to cart pressed");
    API.post(`/recipes/${props.id.toString()}/add_to_cart/`);
  };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleAdd}>
        Add to shopping list
      </Button>
    </div>
  );
};

export default AddIngredientsToShopping;
