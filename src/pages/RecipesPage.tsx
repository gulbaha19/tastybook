import React, {FC, useEffect, useState} from "react";
import {Recipe} from "../models/Recipe";
import {Grid} from "@mui/material";
import {RecipeCard} from "../components/RecipeCard";
import {useStore} from "../provider";
import {useParams} from "react-router-dom";
import {searchRecipesByTitle} from "../utils/searchRecipe";

type Props = {
    recipes: Recipe[]
}
export const RecipesPage: FC = () => {
    const {store} = useStore();
    console.log(store)
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const {key} = useParams()
    useEffect(() => {
        store.loadRecipes()
        setRecipes(searchRecipesByTitle(store.recipes, key))

    },[store])


    return (
        <div>
            <h2>Recipes</h2>
            <Grid container spacing={2} sx={{justifyContent: "center"}}>
                {recipes?.map((recipe) => (
                    <Grid item lg={3} md={4} xs={12} sm={6} key={recipe.id}>
                        <RecipeCard recipe={recipe}/>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}
