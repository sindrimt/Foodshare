import React, { useState, useEffect } from "react";
import RecipeCard from "./Card";

import styled from "styled-components";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { AnimateSharedLayout } from "framer-motion";
//import { useDebounce } from "use-debounce";
import { useDebounce } from "use-debounce";
import { TextField } from "@mui/material";

const CardContainer = () => {
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [text, setText] = useState("");
  const [debouncedValue] = useDebounce(text, 300);

  /*  useEffect(() => {
    axios.get(url).then((res) => {
      const recipes = res.data;
      setState({ recipes });
    });
  }, []); */

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const url = "api/recipes/";
    const result = await axios.get(url);

    const dataList = result.data;
    console.log("==============");
    console.log(dataList);
    console.log("==============");
    setPopular(dataList);
    setFiltered(dataList);
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
    //console.log(filtered);
  };

  // When you press enter on search (kind of useless)
  const handleSubmit = (event) => {
    event.preventDefault();

    const filter = popular?.filter((card) => {
      return card.title.toLowerCase().includes(text);
    });
    setFiltered(filter);
    //console.log(filtered);
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <TextField
            onChange={(e) => setText(e.target.value)}
            id="standard-basic"
            label="Search"
            variant="standard"
            type="text"
          />
        </form>
      </FormContainer>
      <AnimateSharedLayout>
        <motion.div layout>
          <GridContainer>
            {/* <AnimatePresence> */}
            {/* {state.recipes?.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                title={recipe.title}
                description={recipe.content}
                createdAt={recipe.created}
                image={recipe.image}
              />
            ))} */}

            {filtered?.map((card) => {
              return (
                <RecipeCard
                  key={card.id}
                  title={card.title}
                  description={card.content}
                  image={card.image}
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

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default CardContainer;
