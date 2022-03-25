import Stack from "@mui/material/Stack";
import React, { useEffect, useState, useContext } from "react";
import API from "../axios";
import RecipeGrid from "../components/RecipeGrid";
import FollowedUsersList from "../components/FollowedUsersList";
import { UserContext } from "../context/UserContext";
import { Typography } from "@mui/material";

export default function BrowseFollowedPage() {
  const [posts, setPosts] = useState([]);
  const { isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    if (isLoggedIn) {
      API.get("recipes/by_followed/").then((response) => {
        setPosts(response.data);
      });
    }
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <Stack spacing={2} alignItems="center">
          <FollowedUsersList />
          <RecipeGrid posts={posts} />
        </Stack>
      ) : (
        <Typography> You are not logged in. </Typography>
      )}
    </>
  );
}
