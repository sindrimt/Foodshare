import React, { useState, useEffect } from "react";
import RecipeCard from "./Card";

import styled from "styled-components";
import axios from "axios";

const CardContainer = () => {
  const url = "api/recipes";
  const [state, setState] = useState([]);

  useEffect(() => {
    axios.get(url).then((res) => {
      const recipes = res.data;
      setState({ recipes });
    });
  }, []);

  return (
    <GridContainer>
      {state.recipes?.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          title={recipe.title}
          description={recipe.content}
          createdAt={recipe.created}
          image={recipe.image}
        />
      ))}
    </GridContainer>
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
