import React from "react";
import {Carousel as RCarousel} from "react-responsive-carousel";
import food1 from '../assets/carousel/food1.jpeg';
import food2 from '../assets/carousel/food2.jpg';
import food3 from '../assets/carousel/food3.webp';
import food4 from '../assets/carousel/food4.jpg';
import styled from "@emotion/styled";


export const CarouselImages = [
    food1, food2, food3, food4
]

export const StyledCarousel = styled(RCarousel)`
  padding: 30px 0;
  .slider-wrapper {
    height: 428px;
    box-shadow: inset 0 0 0 2000px rgb(0 0 0 / 20%);
    border-radius: 20px;
  }
  div, ul, li {
    height: 100%;
  }
  img {
    height: 100%;
    object-fit: cover;
  }
`
export const Carousel: React.FC = () => {
    return (
        <StyledCarousel autoPlay infiniteLoop animationHandler="fade" showThumbs={false} showArrows={false}
                        showIndicators={false} dynamicHeight={false}
                        useKeyboardArrows interval={2000} swipeScrollTolerance={5} transitionTime={1000}
                        showStatus={false}>
            {
                CarouselImages.map((img,index) => (
                    <div key={index}>
                        <img src={img} alt=""/>
                    </div>
                ))
            }

        </StyledCarousel>
    )
}
