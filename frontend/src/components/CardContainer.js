import React, { useState, useEffect } from "react";
import TestCard from "./TestCard";
import styled from "styled-components";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { AnimateSharedLayout } from "framer-motion";
import { useDebounce } from "use-debounce";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";

const CardContainer = () => {
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [tagFilter, setTagFilter] = useState("");
  const [tags, setTags] = useState([]);
  const [text, setText] = useState("");
  const [debouncedValue] = useDebounce(text, 300);
  const [debouncedValueTag] = useDebounce(tagFilter, 300);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = () => {
    axios
      .get("/api/tags/")
      .then((res) => {
        setTags(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchData = async () => {
    const url = "api/recipes/";
    const result = await axios.get(url);

    const dataList = result.data;

    setPopular(dataList);
    setFiltered(dataList);
  };
  // Updates input from the search field every 300ms
  useEffect(() => {
    if (debouncedValue) filterFunction(tagFilter);
  }, [debouncedValue]);

  // Checks if the search field is empty, and clears the filter if it is
  useEffect(() => {
    if (text == "") {
      filterFunction(tagFilter);
    }
  }, [text]);

  // Filters the recipes on title and on tagname
  const filterFunction = (allValue) => {
    const filter = popular?.filter((card) => {
      if (allValue === "All") return card.title.toLowerCase().includes(text);
      return (
        card.title.toLowerCase().includes(text) &&
        card.tags?.includes(tagFilter)
      );
    });
    setFiltered(filter);
  };

  // When you press enter on search (kind of useless)
  const handleSubmit = (event) => {
    event.preventDefault();
    filterFunction(tagFilter);
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setTagFilter(event.target.value);
  };
  /* Kjører hver gang tag blir oppdatert */
  /* Fins sikkert en bedre måte å gjøre det på, men idc :P */
  useEffect(() => {
    filterFunction(tagFilter);
  }, [tagFilter]);

  return (
    <>
      <FormContainer>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Filter
          </InputLabel>
          <Select value={tagFilter} onChange={handleChange} label="Tags">
            {/* <DropDown> */}
            <MenuItem value="All" sx={{ width: "100%" }}>
              All
            </MenuItem>
            {/* </DropDown> */}

            {/* Rendrer hver tag i dropdownen */}
            {tags?.map((tag) => (
              <MenuItem key={tag.id} value={tag.name} sx={{ width: "100%" }}>
                {tag.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
            {/*  <TestCard /> */}
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
                /* <RecipeCard
                  key={card.id}
                  title={card.title}
                  description={card.content}
                  image={card.image}
                />*/
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

const DropDown = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default CardContainer;
