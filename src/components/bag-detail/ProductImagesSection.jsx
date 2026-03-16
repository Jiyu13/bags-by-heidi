import {useContext, useState} from "react";
import styled from "styled-components";
import {UserContext} from "../../user-content/UserContent";

export function ProductImagesSection({coverImage, otherImages}) {

    const {isMobile} = useContext(UserContext)

    return (
        <ProductImageContainer
            // style={{ width: isMobile ? "100%" : "65%" }}
        >

            {/*================= main image ==================================*/}
            <MainImageList>
                <ImageItem>
                    <ImageWrapper>
                        <img src={`http://127.0.0.1:8000${coverImage}`} style={{width: "100%"}} alt={coverImage}/>
                    </ImageWrapper>
                </ImageItem>
            </MainImageList>

            <OtherImagesList>

                {otherImages?.map((image, index) => (
                    <ImageItem key={image.id || image.product_image || index}>
                      <ImageWrapper>
                        <img
                          src={
                            image.product_image?.startsWith("http")
                              ? image.image
                              : `http://127.0.0.1:8000${image.product_image}`
                          }
                          alt={image.alt || `product-image-${index + 1}`}
                        />
                      </ImageWrapper>
                    </ImageItem>
              ))}
            </OtherImagesList>


        </ProductImageContainer>
    )
}

const ProductImageContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
`;
const MainImageList = styled.ul`
  margin: 0 0 16px 0;
  padding: 0;
  list-style: none;
`
const OtherImagesList = styled.ul`
 box-sizing: border-box;
  margin: 0 0 2rem 0;
  padding: 0;
  list-style: none;

  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 1rem;
  row-gap: 1rem;

  @media (max-width: 988px) {
    grid-template-columns: 1fr;
    row-gap: 8px;
  }
`
const ImageItem = styled.li`
  width: 100%;
  margin: 0;
  padding: 0;

`

const ImageWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  background: rgb(255, 255, 255);
  border-radius: 0;
  box-shadow: none;
  aspect-ratio: 1 / 1;

  img {
    width: 100%;
    display: block;
    object-fit: cover;
  }
`;
