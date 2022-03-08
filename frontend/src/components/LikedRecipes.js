import React, { useState, useEffect, useContext } from "react";
import TestCard from "./TestCard";
import styled from "styled-components";
import axios from "axios";
import { motion } from "framer-motion";
import { AnimateSharedLayout } from "framer-motion";
import { UserContext } from "../context/UserContext";
import Popup from "./Popup";

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
      <Header>Your Liked Recipes</Header>
      <AnimateSharedLayout>
        <motion.div layout>
          <GridContainer>
            {filtered?.map((card) => {
              return (
                <TestCard
                  key={card.id}
                  id={card.id}
                  title={card.title}
                  summary={card.summary}
                  prepTime={card.prep_time}
                  author={card.username}
                  tags={card.tags}
                  content={card.content}
                  image={card.image}
                  created={card.created}
                  likes={card.like_count}
                  isLiked={card.is_liked}
                />
              );
            })}
          </GridContainer>
        </motion.div>
      </AnimateSharedLayout>
      <Popup
        open={open}
        setOpen={setOpen}
        type="success"
        message={`${isLiked} was removed`}
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

export default LikedRecipes;
