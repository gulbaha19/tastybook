import { Grid } from "@mui/material";
import { FC } from "react";
import { Recipe } from "../models/Recipe";
import { RecipeCard } from "./RecipeCard";
type Props = {
  myrecipes: Recipe[];
};
export const MyRecipes: FC<Props> = ({ myrecipes }) => {
  console.log(myrecipes, "recopes my");
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={12 / 7}>
          {myrecipes?.map((recipe: Recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe}></RecipeCard>
          ))}
        </Grid>
      </Grid>
    </>
  );
};
