import React, { useEffect, useState, useContext } from "react";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import API from "../axios";
import { UserContext } from "../context/UserContext";

export default function FollowButton(props) {
  const [followed, setFollowed] = useState(false);
  const [user, setUser] = useState(-1);
  const { loggedIn } = useContext(UserContext);

  useEffect(() => {
    setFollowed(props.followed);
    setUser(props.user);
  }, [props]);

  function HandleFollow() {
    API.post(`accounts/${user}/follow/`).then(
      (response) => {
        console.log(response);
        setFollowed(true);
      },
      (error) => {
        console.log(JSON.stringify(error, null, 2));
      }
    );
  }

  function HandleUnfollow() {
    API.delete(`accounts/${user}/follow/`).then(
      (response) => {
        console.log(response);
        setFollowed(false);
      },
      (error) => {
        console.log(JSON.stringify(error, null, 2));
      }
    );
  }

  return followed ? (
    <Button
      variant="contained"
      startIcon={<PersonRemoveIcon />}
      onClick={HandleUnfollow}
      color="secondary"
    >
      Unfollow
    </Button>
  ) : (
    <Button
      variant="contained"
      startIcon={<PersonAddIcon />}
      onClick={HandleFollow}
      color="primary"
      disabled={!loggedIn}
    >
      Follow
    </Button>
  );
}
