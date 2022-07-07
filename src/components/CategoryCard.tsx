import React from "react";
import styled from "@emotion/styled";
import {Subcategory} from "../models/Subcategory";

export const Card = styled("div")<{ img: string | undefined }>`
  background: linear-gradient(rgba(0, 0, 0, 0.3),
  rgba(0, 0, 0, 0.3)), url(${props => props.img});
  box-shadow: 0 6px 14px 0;
  background-size: cover;
  border-radius: 18px;
  height: 133px;
  max-width: 240px;
  padding: 39px 19px;
  box-sizing: border-box;
  margin-right: 10px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  h3 {
    font-size: 20pt;
    line-height: 18pt;
    margin: 0;
    font-weight: 600;
    cursor: pointer;
    text-transform: uppercase;
    text-align: center;
  }

  h3:hover {
    color: #fefff4;
    transform: scale(1.05);
  }
`
type CategoryProps = {
    category: Subcategory
}
export const CategoryCard: React.FC<CategoryProps> = ({category}) => {
    return (
        <Card img={category.img}>
            <h3>
                {category.name}
            </h3>

        </Card>
    )
}
