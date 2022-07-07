import {Recipe} from "../models/Recipe";

export const searchRecipesByTitle = (recipes: Recipe[], title: string | undefined) => {
    return recipes.filter(recipe => recipe.title?.includes(<string>title))

}
