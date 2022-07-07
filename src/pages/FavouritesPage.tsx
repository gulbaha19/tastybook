import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { RecipeCard } from "../components/RecipeCard";
import { SideBarProfile } from "../components/SideBarProfile";
import { auth } from "../firebase";
import { Recipe } from "../models/Recipe";
import { store } from "../models/Store";
import { Icon, IconHeart } from "../utils/Icon";
import { Box } from "./Profile";

export const FavouritesPage: FC = observer(() => {
  const [user] = useAuthState(auth);
  useEffect(() => {
    store.loadRecipes();
  }, [store]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  // const like = (recipe: Recipe) => {
  //   console.log(toJS(recipe), "recipe");
  //   let ii = new Set(recipe.liked);
  //   ii.add(user?.email);

  //   console.log(ii, "dd");
  //   store.liked(recipe.id, ii);
  // };

  const favs = store.recipes.filter((recipe) => recipe.liked?.map((i) => i === user?.email));

  // const favs = store.recipes.map((recipe: Recipe) => {
  //   console.log(recipe);
  //   if (recipe.liked?.includes('ff'))) return co;
  // });
  // console.log(favs);
  return (
    <>
      <Box>
        <SideBarProfile />
        <div className="adaptive">
          <h2>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <span>My favourites:</span> <span>{favs.length}</span>
            </div>
          </h2>
          <Grid container spacing={3}>
            {favs?.map((recipe: Recipe) => (
              <div style={{ position: "relative" }}>
                <Grid item lg={3} md={3} xs={12} sm={6} key={recipe.id}>
                  <div
                    onClick={() => {
                      navigate("/recipe", {
                        state: { recipe: recipe.title, id: recipe.id },
                      });
                    }}>
                    <RecipeCard recipe={recipe} />
                  </div>

                  {/*<button*/}
                  {/*  onClick={() => store.deleteRecipe(recipe.id)}*/}
                  {/*  style={{ position: "absolute", top: "0", left: "70%" }}>*/}
                  {/*  delete*/}
                  {/*</button>*/}
                  <div
                    // onClick={() => like(recipe)}
                    style={{ position: "absolute", bottom: "0", left: "80%" }}>
                    <IconHeart type="Heart" />
                  </div>
                </Grid>
              </div>
            ))}
          </Grid>
        </div>
      </Box>
    </>
  );
});
