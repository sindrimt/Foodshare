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
import styled from "styled-components";
import { MdBookmarkBorder } from "react-icons/md";
import DeleteIcon from "@material-ui/icons/Delete";
import Popup from "./Popup";

const MyProfile = () => {
  const [posts, setPosts] = useState([]);
  const { currentUser, deletedPost, isDeleted, setIsDeleted } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [initialRender, setInitialRender] = useState(true);

  const fetchPosts = () => {
    const url = "recipes/?user=" + currentUser.id;
    //console.log(currentUser);
    API.get(url).then((response) => {
      setPosts(response.data);
    });
  };

  useEffect(() => {
    console.log("============");
    console.log(isDeleted);
    fetchPosts();
    if (initialRender) {
      setInitialRender(false);
      if (isDeleted === "") {
        setOpen(false);
      }
    } else {
      setOpen(true);
    }
  }, [currentUser, deletedPost]);

  return (
    <>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h3">
          {currentUser.first_name === "" || currentUser.last_name === ""
            ? "Your Recipes"
            : currentUser.first_name + " " + currentUser.last_name + "'s recipes"}
        </Typography>
        <Typography variant="h5">{"@" + currentUser.username}</Typography>
        <Stack spacing={2} direction="row">
          <Button color="primary" variant="contained" to="/profile" component={Link}>
            <EditIcon />
            Edit profile
          </Button>
          {/* <Button
            color="primary"
            variant="contained"
            to="/profile/liked-recipes"
            component={Link}
          >
            <ThumbUpIcon />
            Liked recipes
          </Button> */}
        </Stack>
        <RecipeGrid posts={posts} />
      </Stack>
      <Link to="liked-recipes">
        <SavedIconContainer>
          <MdBookmarkBorder size={45} />
        </SavedIconContainer>
      </Link>
      <Popup open={open} setOpen={setOpen} type="success" message={`${isDeleted} was deleted!`} />
    </>
  );
};

const SavedIconContainer = styled.div`
  position: fixed;
  bottom: 40px;
  right: 40px;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
    transition: 0.25s all ease-in-out;
    background: lightgrey;
    padding: 5px;
  }
`;

export default MyProfile;
