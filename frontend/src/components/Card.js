import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import { motion } from "framer-motion";
import { AnimateSharedLayout } from "framer-motion";

import {
  CardContent,
  CardHeader,
  Typography,
  CardMedia,
} from "@material-ui/core";

const RecipeCard = (props) => {
  return (
    <AnimateSharedLayout>
      <motion.div
        layout
        /* animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }} */
      >
        <Card style={{ maxWidth: "400px" }}>
          <CardHeader
            title={props.title}
            subheader={props.createdAt}
          ></CardHeader>
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
      </motion.div>
    </AnimateSharedLayout>
  );
};
export default RecipeCard;
