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
  const styles = {
    media: {
      width: "320px",
      height: "200px",
      objectFit: "contain",
    },
  };
  return (
    <AnimateSharedLayout>
      <motion.div
        layout
        /* animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }} */
      >
        <Card>
          <CardHeader
            title={props.title}
            subheader={props.createdAt}
          ></CardHeader>
          <CardMedia
            component="img"
            style={styles.media}
            image={props.image}
            alt="Image"
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
