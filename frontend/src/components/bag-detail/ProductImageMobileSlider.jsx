import styled from "styled-components";
import {useEffect, useRef, useState} from "react";

export default function ProductImageMobileSlider({allImages, openImage}) {
    const sliderRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        function handleScroll() {
            const scrollLeft = slider.scrollLeft;
            const width = slider.clientWidth;

            const index = Math.round(scrollLeft / width);
            setActiveIndex(index);
        }

        slider.addEventListener("scroll", handleScroll);
        return () => slider.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <Wrapper>
            <MobileSlider ref={sliderRef}>
                {allImages.map((image, index) => (
                    <MobileSlide key={image.src || index} onClick={() => openImage(index)}>
                        <ImageWrapper>
                            <img src={image.src} alt={image.alt} />
                        </ImageWrapper>
                    </MobileSlide>
                ))}
            </MobileSlider>
            {allImages.length > 1 && (
                <DotsContainer>
                    {allImages.map((_, index) => (
                        <Dot key={index} $active={index === activeIndex} />
                    ))}
                </DotsContainer>
            )}
        </Wrapper>

    )
}
const Wrapper = styled.div`
  width: 100%;
`;
const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 8px;
`;
const Dot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ $active }) => ($active ? "#000" : "#ccc")};
  transition: background 0.2s ease;
`;
const MobileSlider = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 8px;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MobileSlide = styled.div`
  flex: 0 0 100%;
  scroll-snap-align: start;
`;
const ImageWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  background: rgb(255, 255, 255);
  border-radius: 0;
  box-shadow: none;
  aspect-ratio: 1 / 1;

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }
`;