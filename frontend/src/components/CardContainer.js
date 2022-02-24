import React, { useState, useEffect } from "react";
import RecipeCard from "./Card";

import styled from "styled-components";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { AnimateSharedLayout } from "framer-motion";

const CardContainer = () => {
  const url = "api/recipes";
  const [state, setState] = useState([]);

  useEffect(() => {
    axios.get(url).then((res) => {
      const recipes = res.data;
      setState({ recipes });
    });
  }, []);
  // ========

  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await axios.get(
      "http://api.themoviedb.org/3/movie/popular?api_key=ad1ac1d7621db8c39803075fc3658091"
    );
    const dataList = result.data;
    console.log(dataList.results);
    setPopular(dataList.results);
    setFiltered(dataList.results);
  };

  useEffect(() => {
    const filter = popular?.filter((card) => {
      return card.title.toLowerCase().includes(text);
    });
    setFiltered(filter);
    console.log(filtered);
  }, [text]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const filter = popular?.filter((card) => {
      return card.title.toLowerCase().includes(text);
    });
    setFiltered(filter);
    console.log(filtered);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="search"
          onChange={(e) => {
            setText(e.target.value.toLowerCase());
          }}
        />
      </form>
      <AnimateSharedLayout>
        <motion.div layout>
          <GridContainer>
            {/* <AnimatePresence> */}
            {state.recipes?.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                title={recipe.title}
                description={recipe.content}
                createdAt={recipe.created}
                image={recipe.image}
              />
            ))}

            {filtered?.map((card) => {
              return (
                <RecipeCard
                  key={card.id}
                  title={card.title}
                  image={"https://image.tmdb.org/t/p/w500" + card.backdrop_path}
                />
              );
            })}
            {/*  </AnimatePresence> */}
          </GridContainer>
        </motion.div>
      </AnimateSharedLayout>
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

export default CardContainer;
