import { makeAutoObservable, toJS } from "mobx";
import { Category } from "./Category";
import {
  deleteRecipeItem,
  editRecipe,
  fetchCatefories,
  fetchRecipes,
  likeRecipe,
  putRecipes,
} from "../fetchers/fetchCategories";
import { Recipe } from "./Recipe";

export class Store {
  categories: Category[] = [];
  recipes: Recipe[] = [];
  loading: boolean = false;

  constructor(categories: Category[]) {
    this.categories = categories;
    this.recipes = this.recipes;
    makeAutoObservable(this);
  }

  *loadCategories() {
    this.loading = true;
    try {
      const data: Category[] = yield fetchCatefories();
      console.log("fetched", data);
      this.categories = data;
    } catch (e) {
      console.log("error while fetching categories", e);
    } finally {
      this.loading = false;
    }
  }

  *loadRecipes() {
    this.loading = true;
    try {
      const response: Record<string, Recipe> = yield fetchRecipes();
      const data: Recipe[] = Object.values(response);
      console.log("fetchedRecipes", data);
      this.recipes = data;
      console.log(toJS(this.recipes));
    } catch (e) {
      console.log("error while fetching recipes", e);
    } finally {
      this.loading = false;
    }
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }
  *saveRecipe(recipe: Recipe) {
    yield putRecipes(recipe);
  }
  deleteRecipe(id: string | number | undefined) {
    deleteRecipeItem(id).then(() => {
      this.recipes = this.recipes.filter((recipe) => recipe.id !== id);
    });
  }
  edit(id: string, editTitle: string) {
    editRecipe(id, editTitle).then(() => {});
  }
  liked(id: string | number | undefined, users: Set<string | undefined | null> | [] | undefined) {
    likeRecipe(id, users).then(() => {});
  }
}

export const store = new Store([]);
