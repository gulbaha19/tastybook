import axios from "axios";
import { CategoriesResponse, ResipesResponse } from "../models/CategoriesResponse";
import { Recipe } from "../models/Recipe";

export const fetchCatefories = () => {
  return axios
    .get<CategoriesResponse[]>(
      "https://tasty-food-31277-default-rtdb.firebaseio.com/categories.json?api_key=AIzaSyCHnW0LI-KGTq2NdLwtF8hFpU2vepFXSLU",
    )
    .then((res) => res.data);
};

export const fetchRecipes = () => {
  return axios
    .get<Record<string, ResipesResponse>>(
      "https://tasty-food-31277-default-rtdb.firebaseio.com/recipes.json?api_key=AIzaSyCHnW0LI-KGTq2NdLwtF8hFpU2vepFXSLU",
    )
    .then((res) => res.data);
};
export const putRecipes = (data: Recipe) => {
  return axios
    .put(
      `https://tasty-food-31277-default-rtdb.firebaseio.com/recipes/${data.id}.json?api_key=AIzaSyCHnW0LI-KGTq2NdLwtF8hFpU2vepFXSLU`,
      data,
    )
    .then((res) => res.data);
};

export const deleteRecipeItem = (id: string | number | undefined) => {
  return axios
    .delete<Record<string, ResipesResponse>>(
      `https://tasty-food-31277-default-rtdb.firebaseio.com/recipes/${id}.json?api_key=AIzaSyCHnW0LI-KGTq2NdLwtF8hFpU2vepFXSLU`,
    )
    .then((res) => res.data);
};

export const editRecipe = (id: string, editTitle: string) => {
  return axios.patch(`https://tasty-food-31277-default-rtdb.firebaseio.com/recipes/${id}/.json`, {
    title: editTitle,
  });
};
export const likeRecipe = (id: string | number | undefined, users: Set<string | undefined | null> | [] | undefined) => {
  return axios.patch(`https://tasty-food-31277-default-rtdb.firebaseio.com/recipes/${id}/.json`, {
    liked: users,
  });
};
