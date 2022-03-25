import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Rating } from "@mui/material";
import API from "../axios";

const AddIngredientsToShopping = (props) => {
  
  

 
  const handleAdd = () => {
    API.post(`/recipes/${props.id.toString()}/add_to_cart/`);
  };

  

  return (
    <div>
      <Button variant="info" color="red" onClick={handleAdd}>
        Legg til i handleliste
      </Button>
      
    </div>
  );
};

export default AddIngredientsToShopping;
