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

const CommentBox = (props) => {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(-1);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handlePost = () => {
    API.post("comments/", {
      content: comment,
      rating: rating,
      recipe: props.recipe,
    }).then(setOpen(false));
  };

  const handleClose = () => {
    setOpen(false);
    console.log(comment);
    console.log(rating);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add comment
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New comment</DialogTitle>
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
          <Rating
            value={rating}
            name="comment-rating"
            onChange={(e, newRating) => setRating(newRating)}
          />
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlePost}>Post</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CommentBox;
