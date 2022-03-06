import React, { useState, useEffect, useContext } from "react";
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

import API from "../axios";

import { UserContext } from "../context/UserContext";
import { green, lightGreen } from "@mui/material/colors";
//import { createContext } from "react";
//import { LoggedIn } from "./LoggedIn";

const LikeButton = (props) => {
  const [liked, setLiked] = useState(props.isLiked);
  const [likes, setLikes] = useState(props.likes);
  const { loggedIn } = useContext(UserContext);

  function handleLikePressed() {
    if (liked) {
      API.delete("recipes/" + props.id + "/like/").then(
        (message) => console.log(message),
        setLiked(false),
        setLikes(likes - 1)
      );
    } else {
      API.post("recipes/" + props.id + "/like/").then(
        (message) => console.log(message),
        setLiked(true),
        setLikes(likes + 1)
      );
    }
  }

  useEffect(() => {}, [liked, likes]);

  if (loggedIn) {
    return (
      <Button
        size="small"
        color={liked ? "primary" : "secondary"}
        onClick={handleLikePressed}
      >
        <ThumbUpAltIcon fontSize="small" /> {" " + likes}
      </Button>
    );
  } else {
    return (
      <Button
        size="small"
      >
        <ThumbUpAltIcon fontSize="small" /> {" " + likes}
      </Button>
    );
  };
  }

const DeleteButton = (props) => {
  const { loggedIn } = useContext(UserContext);
  const [deleted, setDeleted] = useState(false);
  function handleDeletePressed() {
    API.delete("recipes/" + props.id).then(
      (message) => console.log(message),
      setDeleted(true)
    );
  }

  if (loggedIn) {
    return (
      <Button
        size="small"
        color="primary"
        disabled={deleted ? true : false}
        onClick={handleDeletePressed}
      >
        <DeleteIcon fontSize="small" /> Delete
      </Button>
    );
  } else {
    return (
      <div></div>
    )
  };
  }


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
              <MoreHorizIcon fontSize="medium" />
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
              align="justify"
            >
              {props.summary}
            </Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <LikeButton
              key={props.key}
              id={props.id}
              likes={props.likes}
              isLiked={props.isLiked}
            />
            <DeleteButton key={props.id} id={props.id} />
          </CardActions>
        </Card>
      </motion.div>
    </AnimateSharedLayout>
  );
};

export default TestCard;
