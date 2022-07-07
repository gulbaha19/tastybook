import { Button, styled } from "@mui/material";
import { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AddRecipe } from "../components/AddRecipe";
import { Recipe, RecipeForm } from "../models/Recipe";
import { store } from "../models/Store";
import { LoadPicture } from "../components/LoadPicture";
import { useLocation } from "react-router-dom";
export const Send = styled(Button)`
  background-color: rgba(48, 69, 109, 255) !important;
  color: #fff;
  padding: 2px 5px !important;
  text-transform: capitalize;
  border-radius: 18px !important;

  box-sizing: border-box;
  border: 1px solid #323c41 !important;

  &:hover {
    color: #323c41;
    border: 1px solid #323c41;
  }
`;
export const EditPage = () => {
  useEffect(() => {
    store.loadRecipes();
  }, []);
  const location: any = useLocation();
  const id = location.state?.id;

  const recipe: Recipe[] = store.recipes.filter((i) => i.id === id);

  const methods = useForm<RecipeForm>({
    mode: "onChange",

    defaultValues: {
      id: recipe[0].id,
      title: recipe[0].title,
      userEmail: recipe[0].userEmail,
      // steps: recipe[0].steps,
      // categories: recipe[0].categories,
      imageRecipe: recipe[0].imageRecipe,
      liked: [],
    },
  });
  const { handleSubmit, reset } = methods;
  const onSubmit = useCallback(
    (values: RecipeForm) => {
      const recipe: Recipe = {
        ...values,
        steps: values.steps ? values.steps.map(({ value }) => value) : undefined,
        categories: values.categories ? values.categories.map(({ value }) => value) : undefined

      };

      store.saveRecipe(recipe);

      reset();
      alert("submitted");
    },
    [reset],
  );

  return (
    <div style={{ padding: "50px 100px", display: "flex" }}>
      <LoadPicture />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginLeft: "60px" }}>
          {/* <LoadPicture /> */}
          <AddRecipe />

          <Send variant="contained" type="submit">
            Save
          </Send>
        </form>
      </FormProvider>
    </div>
  );
};
