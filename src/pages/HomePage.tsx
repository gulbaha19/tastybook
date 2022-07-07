import  { FC } from "react";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled";
import {Carousel} from "../components/Carousel";
import {Container} from "@mui/material";
import {SubcategorySlider} from "../components/SubcategorySlider";
import {SubcategoryBlock} from "../components/SubcategoryBlock";
import { SubCategories, SubCategories2 } from "../mockData";

export const Section = styled("section")`
    margin-bottom: 30px;
`
export const HomePage: FC = observer(() => {
 
  return (
    <div style={{ width: "100%" }}>

            <Section className="banner">
                <Carousel/>
                <SubcategorySlider items={SubCategories}/>
            </Section>
            <Section>
                {SubCategories2.map(category => (
                    <SubcategoryBlock subcategory={category}/>
                ))}
            </Section>
    </div>
    
  );
});
