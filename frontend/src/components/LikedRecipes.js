import React, { useState, useEffect, useContext } from "react";
import TestCard from "./TestCard";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimateSharedLayout } from "framer-motion";
import { UserContext } from "../context/UserContext";
import Popup from "./Popup";
import { MdKeyboardArrowLeft } from "react-icons/md";
import RecipeGrid from "./RecipeGrid";

const LikedRecipes = () => {
  const [filtered, setFiltered] = useState([]);
  const { loggedIn, isLiked, setIsLiked } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [initialRender, setInitialRender] = useState(true);

  // Gives feedback when recipe is unliked/removed

  useEffect(() => {
    fetchData();
    if (initialRender) {
      setInitialRender(false);
    } else {
      if (isLiked === "") {
        setOpen(false);
      } else {
        setOpen(true);
      }
    }
  }, [isLiked]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const url = "/api/recipes/is_liked/";
    const result = await axios.get(url);

    const dataList = result.data;

    setFiltered(dataList);
  };
  return (
    <>
      <Link to="/me">
        <SavedIconContainer2>
          <MdKeyboardArrowLeft size={45} />
        </SavedIconContainer2>
      </Link>
      <Header>Your Liked Recipes</Header>
      <AnimateSharedLayout>
        <motion.div layout>
          <RecipeGrid posts={filtered} />
        </motion.div>
      </AnimateSharedLayout>
      <Popup
        open={open}
        setOpen={setOpen}
        type="success"
        message={`${isLiked} was removed`}
        variant="filled"
      />
    </>
  );
};

const GridContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  padding: 3rem;
  place-items: center;
  column-gap: 2rem;
  row-gap: 3rem;
`;

const Header = styled.div`
  font-size: 40px;
  margin: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SavedIconContainer2 = styled.div`
  position: fixed;
  top: 120px;
  left: 10px;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
    transition: 0.25s all ease-in-out;
    background: lightgrey;
    padding: 5px;
  }
`;

export default LikedRecipes;
