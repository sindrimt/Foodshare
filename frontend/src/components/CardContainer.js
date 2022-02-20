import React from "react";
import RecipeCard from "./Card";

import styled from "styled-components";
import axios from "axios";

class CardContainer extends React.Component {
  url = "api/recipes";
  state = {
    recipes: [],
  };

  componentDidMount() {
    axios.get(this.url).then((res) => {
      const recipes = res.data;
      this.setState({ recipes });
      console.log(this.state.recipes);
    });
  }
  render() {
    return (
      <GridContainer>
        {this.state.recipes.map((recipe) => (
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
  }
}

const GridContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  padding: 3rem;
  place-items: center;
  column-gap: 2rem;
  row-gap: 3rem;
`;

export default CardContainer;
