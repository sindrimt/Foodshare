import React, { useEffect, useState, useContext } from "react";
import API from "../axios";
import Stack from "@mui/material/Stack";
import Typography from "@material-ui/core/Typography";
import RecipeGrid from "../components/RecipeGrid";
import { UserContext } from "../context/UserContext";

const ProfilePage = () => {
  const [posts, setPosts] = useState([]);
  const { loggedIn, setLoggedIn, logInSuccess, setLoginSuccess, currentUser } =
    useContext(UserContext);
  const [user, setUser] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const url = "recipes/?user=" + 1;
    const result = await API.get(url);

    setUser(currentUser);

    const dataList = result.data;

    setPosts(dataList);
  };

  return (
    <Stack spacing={2} alignItems="center">
      <Typography variant="h3"> Profile page </Typography>
      <Typography variant="h4"> My posts </Typography>
      <Typography variant="h5"> {"username = " + currentUser}</Typography>
      <RecipeGrid posts={posts} />
    </Stack>
  );
};

export default ProfilePage;
