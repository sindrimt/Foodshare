import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Popup from "./Popup";
import { Rating } from "@mui/material";
import API from "../axios";
import { UserContext } from "../context/UserContext";

const CommentBox = (props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(-1);

  const { wasUpdated, setWasUpdated } = useContext(UserContext);

  const handleClickOpen = () => {
    setOpenDialog(true);
    console.log("OPen");
  };

  const handlePost = () => {
    API.post("comments/", {
      content: comment,
      rating: rating,
      recipe: props.recipe,
    })
      .then(() => {
        console.log("posted");
        setWasUpdated(!wasUpdated);
        setOpenDialog(false);
        setError(false);
        setOpen(true);
      })
      .catch((error) => {
        console.log(JSON.stringify(error, null, 2));
        setError(true);
        setOpen(true);
      });
  };

  const handleClose = () => {
    setOpenDialog(false);
    console.log(comment);
    console.log(rating);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Create review
      </Button>
      <Dialog open={openDialog} onBackdropClick="false" onClose={handleClose}>
        <DialogTitle>New review</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            label="Comment"
            fullWidth
            variant="standard"
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Rating value={rating} name="comment-rating" onChange={(e, newRating) => setRating(newRating)} />
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlePost}>Post</Button>
        </DialogActions>
        <Popup
          open={open}
          setOpen={setOpen}
          type={error ? "error" : "success"}
          message={error ? "Error commenting" : "Comment posted!"}
          variant="filled"
        />
      </Dialog>
      <Popup
        open={open}
        setOpen={setOpen}
        type={error ? "error" : "success"}
        message={error ? "Error commenting" : "Comment posted!"}
        variant="filled"
      />
    </div>
  );
};

export default CommentBox;
