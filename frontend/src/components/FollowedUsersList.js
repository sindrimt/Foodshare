import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import API from "../axios";
import { UserContext } from "../context/UserContext";
import { List, ListItem, Dialog, Fab, ListItemText } from "@mui/material";
import ListIcon from "@mui/icons-material/List";

export default function FollowedUsersList(props) {
  const [followedList, setfollowedList] = useState([]);
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    fetchFollowedList();
    console.log(followedList);
  }, [currentUser]);

  function fetchFollowedList() {
    console.log(JSON.stringify(currentUser));
    API.get(`follows/?user=${currentUser.id}`).then(
      (response) => {
        console.log(response);
        setfollowedList(response.data);
      },
      (error) => {
        console.log(JSON.stringify(error, null, 2));
      }
    );
  }

  return (
    <>
      <Fab
        color="primary"
        sx={{
          margin: 0,
          top: "auto",
          right: 20,
          bottom: 20,
          left: "auto",
          position: "fixed",
        }}
        variant="extended"
        onClick={() => setOpen(true)}
      >
        <ListIcon sx={{ mr: 1 }} />
        Followed users
      </Fab>
      <Dialog onClose={() => setOpen(false)} open={open}>
        <List>
          {followedList.map((followedUser, index) => (
            <ListItem
              key={index}
              button
              component={Link}
              to={`/me/${followedUser.follows}`}
            >
              <ListItemText primary={followedUser.follows_username} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  );
}
