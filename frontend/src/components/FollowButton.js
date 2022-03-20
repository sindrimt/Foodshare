import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import API from "../axios";

export default function FollowButton(props) {
  const [followed, setFollowed] = useState(false);
  const [user, setUser] = useState(-1);

  useEffect(() => {
    setFollowed(props.followed);
    setUser(props.user);
  }, [props]);

  async function HandleFollow() {
    await API.post(`accounts/${user}/follow/`).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(JSON.stringify(error, null, 2));
      }
    );
    setFollowed(true);
  }

  async function HandleUnfollow() {
    await API.delete(`accounts/${user}/follow/`).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(JSON.stringify(error, null, 2));
      }
    );
    setFollowed(false);
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
    >
      Follow
    </Button>
  );
}
