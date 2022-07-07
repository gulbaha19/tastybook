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

export const Box = styled("div")`
  @media (min-width: 768px) {
    display: flex;
  }
  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
  }
  h2 {
    width: 100%;
    color: #bdbdbd;
  }
  .adaptive {
    width: 100%;
    @media (min-width: 768px) {
      padding: 80px;
    }
    @media (max-width: 767px) {
      padding: 0;
      border-bottom: none;
    }
    .adaptiveButton {
      width: 100%;
      @media (min-width: 768px) {
        padding: 80px;
      }
      @media (max-width: 767px) {
        display: inline;
        /* justify-content: space-around; */
        width: 100%;
        padding: 0;
        border-bottom: none;
        /* flex-direction: column; */
      }
    }
  }
  .iconAdap {
    @media (min-width: 768px) {
      display: none;
    }
    @media (max-width: 767px) {
    }
  }
  .textAdap {
    @media (min-width: 768px) {
      /* background-color: none; */
    }
    @media (max-width: 767px) {
      margin-top: 10px;
      font-size: 12px;
      font-weight: 600;
      width: 70px;
      padding: 0;
    }
  }
`;
export const BoxDef = styled("div")`
  display: flex;
  flex-direction: column;
`;
export const BoxReverse = styled("div")`
  margin-top: 50px;
  width: 230px;

  display: flex;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
  }
  @media (max-width: 767px) {
    display: flex;
    flex-direction: row;
  }
  .email {
    font-size: 15px;
    width: 500px;
    line-height: 38px;
    padding-left: 20px;
  }
  .name {
    color: #bdbdbd;
    border-bottom: 1px solid rgba(48, 69, 109, 255);
    /* line-height: 38px; */
    padding-left: 10px;
    @media (max-width: 767px) {
      width: 200px;
      border-bottom: none;
    }
  }
  .button {
    text-transform: capitalize;
    font-size: 18px;
    padding: 10px 20px;
    :hover {
      background-color: #bdbdbd7a;
      cursor: pointer;
    }
    @media (min-width: 768px) {
    }
    @media (max-width: 767px) {
      text-align: center;
      line-height: 15px;
      width: 100%;
    }
  }
`;
export const Profile: FC = observer(() => {
  const [user] = useAuthState(auth);
  useEffect(() => {
    store.loadRecipes();
  }, [store]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const like = (recipe: Recipe) => {
    console.log(toJS(recipe), "recipe");
    let users = new Set<string | undefined | null>(recipe.liked);

    users?.add(user?.email);

    console.log(users, "dd");
    store.liked(recipe.id, users);
  };

  const myrecipes = store.recipes.filter((recipe) => recipe.userEmail === user?.email);
  return (
    <>
      <Box>
        <SideBarProfile />
        <div className="adaptive">
          <h2>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <span>My recipes</span> <span>{myrecipes.length}</span>
            </div>
          </h2>
          <Grid container spacing={3}>
            {myrecipes?.map((recipe: Recipe) => (
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

                  {/* <button
                    onClick={() => {
                      navigate("/recipe", {
                        state: { recipe: recipe.title, id: recipe.id },
                      });
                    }}>
                    Edit
                  </button> */}

                  <button
                    onClick={() => store.deleteRecipe(recipe.id)}
                    style={{ position: "absolute", top: "0", left: "70%" }}>
                    delete
                  </button>
                  <div
                    onClick={() => like(recipe)}
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
