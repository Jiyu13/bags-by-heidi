import {useMemo, useState} from "react";
import styled from "styled-components";
import EnlargeDetailImage from "./EnlargeDetailImage";


export function ProductImagesSection({coverImage, otherImages}) {

    const [selectedIndex, setSelectedIndex] = useState(null);


    function cleanImageUrl(url){
        if (url) {
            return url?.startsWith("http") ? url : `http://127.0.0.1:8000${url}`
        }
    }

    const allImages = useMemo(() => {
        const images = [];

        if (coverImage) {
            images.push({
                src: cleanImageUrl(coverImage),
                alt: "cover-image",
            });
        }

        if (otherImages?.length) {
            otherImages.forEach((image, index) => {
                if (image?.product_image) {
                    images.push({
                        src: cleanImageUrl(image.product_image),
                        alt: image.alt || `product-image-${index + 1}`,
                    });
                }
            });
        }

        return images;
    }, [coverImage, otherImages]);

    function goPrev() {
        setSelectedIndex((prev) => {
            if (prev === null) return null;
            return prev === 0 ? allImages.length - 1 : prev - 1;
        });
    }

    function goNext() {
        setSelectedIndex((prev) => {
            if (prev === null) return null;
            return prev === allImages.length - 1 ? 0 : prev + 1;
        });
    }


    function openImage(index) {
        setSelectedIndex(index);
    }

    function closeImage() {
        setSelectedIndex(null);
    }


    return (
        <>
            <ProductImageContainer>

                {/*================= main image ==================================*/}
                <MainImageList>
                    {allImages[0] && (
                        <ImageItem onClick={() => openImage(0)}>
                            <ImageWrapper>
                                <img src={allImages[0].src} alt={allImages[0].alt} />
                            </ImageWrapper>
                        </ImageItem>
                    )}
                </MainImageList>

                <OtherImagesList>

                    {allImages.slice(1).map((image, index) => (
                        <ImageItem
                            key={image.src || index}
                            onClick={() => openImage(index + 1)}
                        >
                            <ImageWrapper>
                                <img src={image.src} alt={image.alt} />
                            </ImageWrapper>
                        </ImageItem>
                    ))}
                </OtherImagesList>


            </ProductImageContainer>
            <EnlargeDetailImage
                images={allImages}
                currentIndex={selectedIndex}
                isOpen={Number.isInteger(selectedIndex)}
                onClose={closeImage}
                onPrev={goPrev}
                onNext={goNext}
            />
        </>
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
  &:hover {
    cursor: pointer;
  }

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
    height: 100%;
    display: block;
    object-fit: cover;
  }
`;
