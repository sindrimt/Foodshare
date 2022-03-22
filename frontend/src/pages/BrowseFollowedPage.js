import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import API from "../axios";
import RecipeGrid from "../components/RecipeGrid";
import FollowedUsersList from "../components/FollowedUsersList";

export default function BrowseFollowedPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get("recipes/by_followed/").then((response) => {
      setPosts(response.data);
    });
  }, []);

  return (
    <>
      <Stack spacing={2} alignItems="center">
        <FollowedUsersList />
        <RecipeGrid posts={posts} />
      </Stack>
    </>
  );
}
