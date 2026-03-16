import styled from "styled-components";
import {useContext} from "react";
import {UserContext} from "../../user-content/UserContent"
import {HomeCategories} from "./HomeCategories";


export default function Featured() {
    const {products, setProducts} = useContext(UserContext)

    return (
        <FeaturedContainer>
            <FeaturedWrapper>
                {/*<FeaturedTitleBlock>*/}
                {/*    <FeaturedTitle>*/}
                {/*        Shop backpacks & bags*/}
                {/*    </FeaturedTitle>*/}
                {/*</FeaturedTitleBlock>*/}

                {/*<FeaturedList>*/}
                {/*    {Array.from({ length: 4 }).map((_, i) => {*/}
                {/*        const product = products?.[0];*/}
                {/*        if (!product) return null;*/}

                {/*        return (*/}
                {/*            <ItemContainer key={i}>*/}
                {/*                <ItemCard id={product.id}>*/}
                {/*                    <ProductImage>*/}
                {/*                        {product.image && (*/}
                {/*                            <Img*/}
                {/*                                src={product.image}*/}
                {/*                                alt={product.title}*/}
                {/*                            />*/}
                {/*                        )}*/}
                {/*                    </ProductImage>*/}

                {/*                    <ProductContent>*/}
                {/*                        <ProductTitle>{product.title}</ProductTitle>*/}
                {/*                    </ProductContent>*/}
                {/*                </ItemCard>*/}
                {/*            </ItemContainer>*/}
                {/*        );*/}
                {/*    })}*/}
                {/*</FeaturedList>*/}

                <HomeCategories />


            </FeaturedWrapper>
        </FeaturedContainer>
    )
}

const FeaturedContainer = styled.section`
  background: #fff;
`;

const FeaturedWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 5rem;

  @media (max-width: 988px) {
    padding: 2.5rem 1.5rem;
  }
`;

const FeaturedTitleBlock = styled.div`
    width: 100%;
    text-align: center;
    margin: 0 auto 2rem;
    max-width: 720px;
    padding: 1rem 0;
`;



const FeaturedTitle = styled.h2`
  margin: 0 0 0.75rem;
  font-size: 2rem;
  font-weight: 500;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.65rem;
  }
`;

const FeaturedList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;

  @media (max-width: 988px) {
    display: flex;
    gap: 16px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding-bottom: 0.5rem;

    &::-webkit-scrollbar {
      height: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 999px;
    }
  }
`;

const ItemContainer = styled.li`
  min-width: 0;

  @media (max-width: 988px) {
    flex: 0 0 calc(50% - 8px);
    scroll-snap-align: start;
  }

  @media (max-width: 640px) {
    flex: 0 0 78%;
  }
`;

const ItemCard = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ProductImage = styled.div`
  width: 100%;
  //aspect-ratio: 1 / 1;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  display: block;
  object-fit: contain;
`;

const ProductContent = styled.div`
  padding-top: 12px;
  display: flex;
  justify-content: center;
  text-align: center;
`;

const ProductTitle = styled.h3`
  margin: 0;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.4;
`;