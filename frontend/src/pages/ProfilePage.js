import Typography from "@material-ui/core/Typography";
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

const ProfilePage = () => {
  const [posts, setPosts] = useState([]);
  const [profileUser, setProfileUser] = useState({});

  const { currentUser } = useContext(UserContext);

  const params = useParams();

  const fetchUser = () => {
    // const url = `api/accounts/1/`;
    // GET request i current URL
    axios.get(`/api/accounts/${params.id.toString()}/`).then((response) => setProfileUser(response.data));
  };

  const fetchPosts = () => {
    if (profileUser.id === undefined) {
      return;
    } else {
      console.log(profileUser.id);
      const url = "recipes/?user=" + profileUser.id;

      API.get(url).then((response) => setPosts(response.data));
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [profileUser]);

  return (
    <>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h3">
          {profileUser.first_name === "" || profileUser.last_name === ""
            ? "Your Recipes"
            : profileUser.first_name + " " + profileUser.last_name + "'s recipes"}
        </Typography>
        <Typography variant="h5">{"@" + profileUser.username}</Typography>
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

export default ProfilePage;
