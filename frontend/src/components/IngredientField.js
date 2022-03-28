import { Stack } from "@mui/material";
import React, { useState } from "react";
import { TextField } from "@mui/material";
import { MenuItem } from "@mui/material";

const units = [
  {
    value: "g",
    label: "g",
  },
  {
    value: "pcs.",
    label: "pcs.",
  },
  {
    value: "ml",
    label: "ml",
  },
];

const IngredientField = ({ ingredient, onInputChange, position }) => {
  const onChange = (e) => onInputChange(e.target, position);

  return (
    <Stack direction="row" spacing={1}>
      <TextField
        name="name"
        label="Ingredient"
        variant="outlined"
        value={ingredient.name}
        onChange={onChange}
      />
      <TextField
        name="amount"
        label="Amount"
        variant="outlined"
        type="number"
        value={ingredient.amount}
        onChange={onChange}
      />
      <TextField
        name="unit"
        select
        label="Unit"
        variant="outlined"
        helperText="Unit"
        onChange={onChange}
        value={ingredient.unit}
      >
        {units.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
};

export default IngredientField;
