import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import { motion } from "framer-motion";
import { AnimateSharedLayout } from "framer-motion";

import useStyles from "./styles";

const TestCard = (props) => {
  const classes = useStyles();

  return (
    <AnimateSharedLayout>
      <motion.div layout>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={props.image}
            title={props.title}
            alt="image"
          />
          <div className={classes.overlay}>
            <Typography variant="h6">
              {props.author ? props.author : "Author"}
            </Typography>
            <Typography variant="body2">{props.created}</Typography>
          </div>
          <div className={classes.overlay2}>
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={() => console.log("clicked")}
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
          </div>
          <div className={classes.details}>
            <Typography variant="body2" color="textSecondary" component="h2">
              {props.tags.map((s) => "#" + s).join(", ")}
              {/* prepend all elements with a # and display nicely */}
            </Typography>
          </div>
          <Typography
            className={classes.title}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {props.title}
          </Typography>
          <CardContent>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{ whiteSpace: "pre-line" }}
              align="justifyContent"
            >
              {props.summary}
            </Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button
              size="small"
              color="primary"
              onClick={() => console.log("liked post")}
            >
              <ThumbUpAltIcon fontSize="small" /> {" " + props.likes}
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => console.log("post deleted")}
            >
              <DeleteIcon fontSize="small" /> Delete
            </Button>
          </CardActions>
        </Card>
      </motion.div>
    </AnimateSharedLayout>
  );
};

export default TestCard;
