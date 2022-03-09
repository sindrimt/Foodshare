import React, { useEffect, useState, useContext, useRef } from "react";
import API from "../axios";
import Stack from "@mui/material/Stack";
import Typography from "@material-ui/core/Typography";
import RecipeGrid from "../components/RecipeGrid";
import { UserContext } from "../context/UserContext";

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
    <Stack spacing={2} alignItems="center">
      <Typography variant="h3">
        {currentUser.first_name + currentUser.last_name + "'s recipes"}
      </Typography>
      <Typography variant="h5">{"@" + currentUser.username}</Typography>
      <RecipeGrid posts={posts} />
    </Stack>
  );
};

export default ProfilePage;
