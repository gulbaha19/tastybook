export class Recipe {
  id: string | number | undefined;
  title: string | undefined;

  steps?: string[];
  categories?: string[];
  userEmail?: string | undefined;
  imageRecipe?: string | undefined;
  rating?: number;
  liked: [] | undefined;
}

export type RecipeForm = Omit<Recipe, "steps" | "categories">  & {
  steps?: { value: string; id: string }[];
  categories?: { value: string; id: string }[];
};
