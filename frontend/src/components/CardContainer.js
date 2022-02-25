import React, { useState, useEffect } from "react";
import RecipeCard from "./Card";

import styled from "styled-components";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { AnimateSharedLayout } from "framer-motion";
//import { useDebounce } from "use-debounce";
import { useDebounce } from "../hooks/useDebounce";

const CardContainer = () => {
  const url = "api/recipes";
  const [state, setState] = useState([]);
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [text, setText] = useState("");
  const [debouncedValue] = useDebounce(text, 300);

  useEffect(() => {
    axios.get(url).then((res) => {
      const recipes = res.data;
      setState({ recipes });
    });
  }, []);

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
  // Updates input from the search field every 300ms
  useEffect(() => {
    if (debouncedValue) filterFunction();
  }, [debouncedValue]);

  // Checks if the search field is empty, and clears the filter if it is
  useEffect(() => {
    if (text == "") {
      filterFunction();
    }
  }, [text]);

  // Filters the movies based on title
  const filterFunction = () => {
    const filter = popular?.filter((card) => {
      return card.title.toLowerCase().includes(text);
    });
    setFiltered(filter);
    console.log(filtered);
  };

  // When you press enter on search (kind of useless)
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
