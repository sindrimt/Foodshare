import React from "react";
import TestCard from "./TestCard";
import styled from "styled-components";

const RecipeGrid = (props) => {
  return (
    <GridContainer>
      {props.posts.map((card) => {
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
            user={card.user}
          />
        );
      })}
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

export default RecipeGrid;
