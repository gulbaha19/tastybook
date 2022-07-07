import React from "react";
import {CategoryCard} from "./CategoryCard";
import styled from "@emotion/styled";
import Carousel from "react-multi-carousel";
import {Subcategory} from "../models/Subcategory";

type Props = {
    items: Subcategory[]
}
export const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1025 },
        items: 4,
        partialVisibilityGutter: 30
    },
    tablet: {
        breakpoint: { max: 1025, min: 769 },
        items: 3,
        partialVisibilityGutter: 10
    },
    small: {
        breakpoint: { max: 769, min: 464 },
        items: 2,
        partialVisibilityGutter: 10
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        partialVisibilityGutter: 10
    }
};
const StyledCarousel = styled(Carousel)`
    padding: 5px;
`
export const SubcategorySlider: React.FC<Props> = ({items}) => {
    return (
        <StyledCarousel  partialVisible={true}
                         additionalTransfrom={0}
                         arrows = {false}
                         autoPlay
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
                         swipeable>

            {items.map((item,i:number) => (
                <CategoryCard key={item.id} category={item}/>
            ))}
        </StyledCarousel>
    )
}
