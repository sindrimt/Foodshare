import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MdBookmarkBorder } from "react-icons/md";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import API from "../axios";
import RecipeGrid from "../components/RecipeGrid";
import { UserContext } from "../context/UserContext";
import FollowButton from "../components/FollowButton";

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
        <Typography variant="h5">{"Recipes by users you follow"}</Typography>
        <RecipeGrid posts={posts} />
      </Stack>
    </>
  );
}
