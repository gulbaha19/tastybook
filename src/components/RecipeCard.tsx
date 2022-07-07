import React from "react";
import styled from "@emotion/styled";
import {Card, CardContent, CardMedia, Rating} from "@mui/material";
import { Recipe } from "../models/Recipe";

export const StyledCard = styled(Card)`
  min-width: 200px;
  max-width: 240px;
  background: #ebece9;
  border-radius: 18px;
  margin-right: 10px;
  
  box-shadow: 1px 3px 3px rgba(0, 0, 0, 0.2),
    -1px -1px 4px rgba(0, 0, 0, 0.2);
  &:hover {
    box-shadow:
            2px 6px 6px rgba(0,0,0,0.2),
              -1px -1px 7px rgba(0,0,0,0.2);
  }
  img {
    height: 220px;
  }
  .MuiCardContent-root {
    text-align: left;
  }
  .title {
    font-size: 1.4em;
    text-align: center;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-overflow: ellipsis;
    margin-bottom: 8px;
  }
  .author {
    text-align: left;
    font-size: 12px;
  }
`

type RecipeCardProps = {
    recipe: Recipe
}
export const RecipeCard: React.FC<RecipeCardProps> = ({recipe}) => {
    return (
        <StyledCard>
            <CardMedia
                component="img"
                height="194"
                image={recipe.imageRecipe}
                alt="dish"
            />
            <CardContent>
                <h3 className="title">
                    {recipe.title}
                </h3>
                <p className="author">
                    by <b>{recipe.userEmail}</b>
                </p>
                <Rating name="half-rating" defaultValue={recipe.rating} precision={0.5} readOnly/>
            </CardContent>
        </StyledCard>
    )
}
