import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  IconButton,
} from "@mui/material/";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Rating from "@mui/material/Rating";
import CardActionArea from "@mui/material/CardActionArea";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
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
import AddIngredientsToShopping from "./AddIngredientsToShopping";

import EditIcon from "@mui/icons-material/Edit";

import { Grid } from "@mui/material";
import { List, ListItem, ListItemText } from "@mui/material";

import Box from "@mui/material/Box";

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
        <Button
          size="small"
          color={liked ? "primary" : "secondary"}
          onClick={handleLikePressed}
        >
          <ThumbUpAltIcon fontSize="small" /> {" " + likes}
        </Button>
      </>
    );
  } else {
    return (
      <>
        <Popup
          open={open}
          setOpen={setOpen}
          type="error"
          message="Not Logged In"
          variant="filled"
        />
        <Button size="small" onClick={handleErrorLike}>
          <ThumbUpAltIcon fontSize="small" /> {" " + likes}
        </Button>
      </>
    );
  }
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteButton = ({ id, title }) => {
  const { deletedPost, setDeletedPost, isDeleted, setIsDeleted } =
    useContext(UserContext);

  function handleDeletePressed() {
    console.log(id);
    API.delete("recipes/" + id + "/").then(
      (message) => setDeletedPost(!deletedPost),
      setIsDeleted(title)
    );
  }
  // Sjekker om man er på sin egen profilside
  if (
    window.location.href === "http://127.0.0.1:8000/me" ||
    window.location.href === "http://localhost:8000/me"
  ) {
    return (
      <Button size="small" color="primary" onClick={handleDeletePressed}>
        <DeleteIcon fontSize="small" /> Delete
      </Button>
    );
  } else {
    return "";
  }
};

const TestCard = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const {
    loggedIn,
    setLoggedIn,
    logInSuccess,
    setLoginSuccess,
    setCurrentUser,
    currentUser,
    isLiked,
    setIsLiked,
  } = useContext(UserContext);

  const navigate = useNavigate();

  const fetchComments = () => {
    API.get(`comments/?recipe=${props.id}`).then((response) => {
      setComments(response.data);
      console.log(response.data);
    });
  };

  useEffect(() => {
    fetchComments();
  }, []);

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

  const navigateEditCard = () => {
    axios.get(`api/recipes/${props.id}/`).then((res) => {
      // console.log(res.data);
      navigate(`/recipe/${props.id}`);
    });
  };

  //TODO Drill props til parent
  const EditButton = ({ id, title }) => {
    // Sjekker om man er på sin egen profilside
    if (
      window.location.href === "http://127.0.0.1:8000/me" ||
      window.location.href === "http://localhost:8000/me"
    ) {
      return (
        <IconButton onClick={navigateEditCard}>
          <EditIcon />
        </IconButton>
      );
    } else {
      return "";
    }
  };

  const commonStyles = {
    bgcolor: "background.paper",
    borderColor: "text.primary",
    m: 1,
    border: 1,
    width: "15rem",
  };

  return (
    <AnimateSharedLayout>
      <motion.div layout>
        <Dialog
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
          scroll="body"
        >
          <img
            style={{ Width: "600px", height: "auto" }}
            src={props.image}
            alt="image"
          />
          <Grid container>
            <Grid item xs={8}>
              <DialogContent>
                <DialogContentText>
                  {props.tags.map((s) => "#" + s).join(", ")}
                </DialogContentText>
              </DialogContent>
            </Grid>
            <Grid item xs={4}>
              <DialogContent>
                <DialogContentText>
                  Created by: {props.author}
                </DialogContentText>
              </DialogContent>
            </Grid>
            <Grid item xs={7}>
              <DialogContent>
                <DialogTitle>{props.title}</DialogTitle>
                <DialogContentText>{props.summary}</DialogContentText>
                <DialogContent>
                <DialogContentText>Prep time: {props.prepTime} min</DialogContentText>
                </DialogContent>
                  <DialogContentText>{props.content}</DialogContentText>
              </DialogContent>
            </Grid>
            <Grid item xs={5} md={5}>
              <Box sx={{ ...commonStyles, borderRadius: 1 }}>
                <List>
                  Ingredients:
                  {props.ingredients.map((ingredient, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={
                          ingredient.name +
                          ":  " +
                          ingredient.amount +
                          " " +
                          ingredient.unit
                        }
                      />
                    </ListItem>
                  ))}
                </List>
                <AddIngredientsToShopping id={props.id} />
              </Box>
            </Grid>
            <Grid item xs={3}>
              <DialogContent>
                <LikeButton
                  id={props.id}
                  likes={props.likes}
                  isLiked={props.isLiked}
                />
              </DialogContent>
            </Grid>
            <Grid item xs={4}>
              <DialogContent>
                <Rating value={props.avgRating} readOnly />
              </DialogContent>
            </Grid>
            <Grid item xs={5}>
              <CommentBox recipe={props.id} />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{borderColor: "text.primary" , borderTop: 1 }}>
              <Typography> Comments </Typography>
              <List>
                {comments.map((comment, index) => (
                  <ListItem key={comment.id}>
                    <ListItemText
                      primary={comment.content}
                      secondary={comment.username}
                    />
                    <Rating edge="end" value={comment.rating} readOnly />
                  </ListItem>
                ))}
              </List>
              </Box>
            </Grid>
          </Grid>
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
                <Typography variant="h6">
                  {props.author ? props.author : "Author"}
                </Typography>
                <Typography variant="body2">{props.created}</Typography>
              </div>
            </div>
          </AuthorContainer>
          {/* HER ER COMPONENTEN  */}
          <CardActionArea onClick={handleClickOpen}>
            <CardMedia
              className={classes.media}
              image={props.image}
              title={props.title}
              alt="image"
            />

            <div className={classes.overlay2}>
              <Button
                disabled={true}
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
                component="p"
                color="textSecondary"
                style={{ whiteSpace: "pre-line" }}
                align="justify"
              >
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
            {/* <EditHover>
              <EditIcon onClick={navigateEditCard} />
            </EditHover> */}
            <DeleteButton id={props.id} title={props.title} />
            <EditButton />
          </CardActions>
        </Card>
      </motion.div>
    </AnimateSharedLayout>
  );
};

const EditHover = styled.span`
  &:hover {
    cursor: pointer;
    border-bottom: 2px solid gray;
  }
`;
const AuthorContainer = styled.span`
  z-index: 1;
`;

export default TestCard;
