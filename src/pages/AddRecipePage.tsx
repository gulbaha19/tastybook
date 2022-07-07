import { Button, styled } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FormProvider, useForm } from "react-hook-form";
import { AddRecipe } from "../components/AddRecipe";
import { auth } from "../firebase";
import { Recipe, RecipeForm } from "../models/Recipe";
import { store } from "../models/Store";
import { LoadPicture } from "../components/LoadPicture";
import { useNavigate } from "react-router-dom";
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
export const AddRecipePage = () => {
  const [urll, setUrl] = useState("");
  useEffect(() => {
    store.loadRecipes();
  }, []);
  const [user] = useAuthState(auth);

  const methods = useForm<RecipeForm>({
    mode: "onChange",

    defaultValues: {
      id: new Date().toString(),
      title: "",
      userEmail: user?.email?.toString(),
      steps: [],
      categories: [],
      imageRecipe: "",
      liked: [],
    },
  });

  const { handleSubmit, reset,setValue } = methods;
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (values: RecipeForm) => {
      const recipe: Recipe = {
        ...values,
        steps: values.steps ? values.steps.map(({ value }) => value) : undefined,
        categories: values.categories ? values.categories.map(({ value }) => value) : undefined

      };

      store.saveRecipe(recipe);
      navigate("/", {});
      reset();
      alert("submitted");
    },
    [reset],
  )
  return (
    <div style={{ padding: "50px 100px", display: "flex" }}>
      <LoadPicture loadPic={(url: string) => setValue('imageRecipe',url)} />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginLeft: "60px" }}>

          <AddRecipe />
          <Send variant="contained" type="submit">
            Save
          </Send>
        </form>
      </FormProvider>
    </div>
  );
};
