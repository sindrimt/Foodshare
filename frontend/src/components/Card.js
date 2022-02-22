import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import {
  CardContent,
  CardHeader,
  Typography,
  CardMedia,
} from "@material-ui/core";

const RecipeCard = (props) => {
  return (
    <Card style={{ maxWidth: "400px" }}>
      <CardHeader title={props.title} subheader={props.createdAt}></CardHeader>
      <CardMedia
        component="img"
        height="194"
        image={props.image}
        alt="Spaghetti"
      />
      <CardContent className="recipe_card">
        <Typography id="text" color="textSecondary">
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default RecipeCard;
