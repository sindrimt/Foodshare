import React, { useEffect, useState, useContext, useRef } from "react";
import API from "../axios";
import Stack from "@mui/material/Stack";
import Typography from "@material-ui/core/Typography";
import RecipeGrid from "../components/RecipeGrid";
import { UserContext } from "../context/UserContext";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const ProfilePage = () => {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useContext(UserContext);

  const fetchPosts = () => {
    const url = "recipes/?user=" + currentUser.id;
    console.log(currentUser);
    API.get(url).then((response) => setPosts(response.data));
  };

  useEffect(() => {
    fetchPosts();
  }, [currentUser]);

  return (
    <>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h3">
          {currentUser.first_name + currentUser.last_name + "'s recipes"}
        </Typography>
        <Typography variant="h5">{"@" + currentUser.username}</Typography>
        <Stack spacing={2} direction="row">
          <Button
            color="primary"
            variant="contained"
            to="/profile"
            component={Link}
          >
            <EditIcon />
            Edit profile
          </Button>
          <Button
            color="primary"
            variant="contained"
            to="/profile/liked-recipes"
            component={Link}
          >
            <ThumbUpIcon />
            Liked recipes
          </Button>
        </Stack>
        <RecipeGrid posts={posts} />
      </Stack>
    </>
  );
};

export default ProfilePage;
