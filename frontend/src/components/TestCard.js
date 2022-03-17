import React, { useState, useEffect, useContext } from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Rating from "@mui/material/Rating";
import CardActionArea from "@material-ui/core/CardActionArea";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import { AnimateSharedLayout } from "framer-motion";

import useStyles from "./styles";

import API from "../axios";
import axios from "axios";
import Popup from "./Popup";

import { UserContext } from "../context/UserContext";
import { green, lightGreen } from "@mui/material/colors";

import CommentBox from "./CommentBox";
import { DialogContentText } from "@mui/material";

const LikeButton = (props) => {
  const [liked, setLiked] = useState(props.isLiked);
  const [likes, setLikes] = useState(props.likes);

  const [open, setOpen] = useState(false);

  const { loggedIn, isLiked, setIsLiked } = useContext(UserContext);

  const handleErrorLike = () => {
    setOpen(true);
  };

  function handleLikePressed() {
    if (liked) {
      API.get(`recipes/${props.id}/`).then((recipe) => {
        setIsLiked(recipe.data.title);
      });
      API.delete("recipes/" + props.id + "/like/").then(
        (message) => console.log(message.data),
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
      <>
        <Button size="small" color={liked ? "primary" : "secondary"} onClick={handleLikePressed}>
          <ThumbUpAltIcon fontSize="small" /> {" " + likes}
        </Button>
      </>
    );
  } else {
    return (
      <>
        <Popup open={open} setOpen={setOpen} type="error" message="Not Logged In" />
        <Button size="small" onClick={handleErrorLike}>
          <ThumbUpAltIcon fontSize="small" /> {" " + likes}
        </Button>
      </>
    );
  }
};

const RatingComponent = () => {
  const { loggedIn } = useContext(UserContext);

  if (loggedIn) {
    return (
      <Rating
        name="simple-controlled"
        value={1}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    );
  } else {
    return <Rating name="simple-controlled" value={2} disabled />;
  }
};

/*const DeleteButton = (props) => {
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
    return <div></div>;
  }
}; */

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TestCard = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { loggedIn, setLoggedIn, logInSuccess, setLoginSuccess, setCurrentUser, currentUser, isLiked, setIsLiked } =
    useContext(UserContext);

  const navigate = useNavigate();

  const styles = {
    underline: {
      textDecoration: "underline",
    },
    noLine: {
      textDecoration: "none",
    },
  };

  const handleClickOpen = () => {
    console.log("handle click open clicked");
    setOpen(true);
  };

  const handleClose = () => {
    console.log("handle close clicked");
    setOpen(false);
  };

  const navigateUser = () => {
    console.log(currentUser);
    axios.get(`api/accounts/${props.user}/`).then((res) => {
      console.log(res.data);
      navigate(`/me/${props.user}`);
    });
  };

  //TODO Drill props til parent

  return (
    <AnimateSharedLayout>
      <motion.div layout>
        <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
          <img style={{ maxWidth: "100%", height: "auto" }} src={props.image} alt="image" />
          <DialogTitle>{props.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{props.author}</DialogContentText>
            <DialogContentText>{props.summary}</DialogContentText>
            <Rating
              /* key={props.id} er denne nødvendig? id={props.id} */
              value={props.avgRating}
              readOnly
            />
          </DialogContent>
          <CommentBox />
        </Dialog>
        <Card
          /* className={classes.card} */
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: "15px",
            height: "100%",
            width: "350px",
            position: "relative",
          }}
        >
          <AuthorContainer onClick={navigateUser}>
            <div
              style={{
                position: "absolute",
                top: "20px",
                left: "20px",
                color: "white",
              }}
            >
              <div className={classes.underline}>
                <Typography variant="h6">{props.author ? props.author : "Author"}</Typography>
                <Typography variant="body2">{props.created}</Typography>
              </div>
            </div>
          </AuthorContainer>
          {/* HER ER COMPONENTEN  */}
          <CardActionArea onClick={handleClickOpen}>
            <CardMedia className={classes.media} image={props.image} title={props.title} alt="image" />

            <div className={classes.overlay2}>
              <Button disabled={true} style={{ color: "white" }} size="small" onClick={() => console.log("clicked")}>
                <MoreHorizIcon fontSize="medium" />
              </Button>
            </div>
            <div className={classes.details}>
              <Typography variant="body2" color="textSecondary" component="h2">
                {props.tags.map((s) => "#" + s).join(", ")}
                {/* prepend all elements with a # and display nicely */}
              </Typography>
            </div>
            <Typography className={classes.title} gutterBottom variant="h5" component="h2">
              {props.title}
            </Typography>
            <CardContent>
              <Typography variant="body2" component="p" color="textSecondary" style={{ whiteSpace: "pre-line" }} align="justify">
                {props.summary}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions className={classes.cardActions}>
            <LikeButton
              /* key={props.key} er denne nødvendig?*/
              id={props.id}
              likes={props.likes}
              isLiked={props.isLiked}
            />
            <Rating
              /* key={props.id} er denne nødvendig? id={props.id} */
              value={props.avgRating}
              readOnly
            />
          </CardActions>
        </Card>
      </motion.div>
    </AnimateSharedLayout>
  );
};

const AuthorContainer = styled.span`
  z-index: 1;
`;

export default TestCard;
