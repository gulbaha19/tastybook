import React from "react";
import styled from "@emotion/styled";
import {Box} from "@mui/material";
import {Recipes} from "../mockData";
import {RecipeSlider} from "./RecipeSlider";
import {Subcategory} from "../models/Subcategory";

const StyledBox = styled(Box)`
  text-align: left;
  margin-bottom: 30px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  h2 {
    text-transform: uppercase;
    margin: 0;
    font-size: 32px;
  }

  .view {
    color: #4a227d;
    font-size: 16px;
    text-decoration: none;
  }

  p {
    word-wrap: break-word;
    color: #323c41;
    font-size: 12pt;
    font-weight: 400;
    line-height: 19.5pt;
  }
`


type Props = {
    subcategory: Subcategory
}
export const SubcategoryBlock: React.FC<Props> = ({subcategory}) => {
    return (
        <StyledBox>
            <div className="header">
                <h2>{subcategory.name}</h2>
                <a className="view" href={`/subcategory/${subcategory.id}`}>View all </a>
            </div>
            <div className="content">
                <p>{subcategory.description}</p>
                <RecipeSlider items={Recipes}/>
            </div>
        </StyledBox>
    )
}
