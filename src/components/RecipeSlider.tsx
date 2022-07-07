import React from "react";
import Carousel from "react-multi-carousel";
import {RecipeCard} from "./RecipeCard";
import {responsive} from "./SubcategorySlider";
import styled from "@emotion/styled";
import {Recipe} from "../models/Recipe";

type Props = {
    items: Recipe[]
}
const StyledCarousel = styled(Carousel)`
  padding: 5px;
`
export const RecipeSlider: React.FC<Props> = ({items}) => {
    return (
        <StyledCarousel
            partialVisible={true}
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={responsive}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
        >
            {items.map((item, i: number) => (
                <RecipeCard key={item.id} recipe={item}/>
            ))}
        </StyledCarousel>
    )
}
