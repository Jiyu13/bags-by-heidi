import styled from "styled-components";
import {useContext} from "react";
import {UserContext} from "../../user-content/UserContent";


export function HomeCategories() {

    const {productCategories} = useContext(UserContext)


    return (
        <CategorySectionContainer className='category-section-container'>
            <CategorySectionWrapper className='category-wrapper-container'>
                <CategoryListContainer className='category-list-container'>
                     {productCategories?.map((category, index) => {
                        const category_name = category?.category
                        const lowercase = category_name.toLowerCase()
                        const cover_image = category?.cover_image
                        return (
                            <CategoryItem className={lowercase} href={`/shop/${lowercase}`} key={category?.id}>
                                <Img src={cover_image} alt={lowercase}/>
                                <ShopButton>
                                    <ShopButtonLink>{category_name}</ShopButtonLink>
                                </ShopButton>
                            </CategoryItem>
                        )
                    })}

                </CategoryListContainer>
            </CategorySectionWrapper>
        </CategorySectionContainer>
    )
}

const CategorySectionContainer = styled.section`
  background: transparent;
`;

const CategorySectionWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 5rem;

  @media (max-width: 988px) {
    padding: 2.5rem 1.5rem;
  }
`;
const CategoryListContainer = styled.div`
  display: grid;
  grid-gap: 0.8rem;
  margin: 0 auto;
  max-width: 1440px;
  box-sizing: border-box;
  
  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(16, 8vw);
    
    .backpacks {
        grid-column-start: 1;
        grid-column-end: 9;
        grid-row-start: 1;
        grid-row-end: 9;
    }

    .handbags {
      grid-column: 1 / 5;
      grid-row: 9 / 13;
    }

    .totes {
      grid-column: 5 / 9;
      grid-row: 9 / 13;
    }

    .quilts {
      grid-column: 1 / 5;
      grid-row: 13 / 17;
    }

    .accessories {
      grid-column: 5 / 9;
      grid-row: 13 / 17;
    }
  }

  @media only screen and (min-width: 768px) and (max-width: 990px) {
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(4, 8vw);
    padding: 0 2rem;
    
    .backpacks {
        grid-column-start: 1;
        grid-column-end: 5;
        grid-row-start: 1;
        grid-row-end: 5;
    }

    .handbags {
      grid-column: 5 / 7;
      grid-row: 1 / 3;
    }

    .totes {
      grid-column: 7 / 9;
      grid-row: 1 / 3;
    }

    .quilts {
      grid-column: 5 / 7;
      grid-row: 3 / 5;
    }

    .accessories {
      grid-column: 7 / 9;
      grid-row: 3 / 5;
    }
  }

  @media only screen and (min-width: 990px) {
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(4, 8vw);
    padding: 0 2rem;
    //grid-auto-rows: 300px;
    .backpacks {
        grid-column-start: 1;
        grid-column-end: 5;
        grid-row-start: 1;
        grid-row-end: 5;
    }
    .handbags {
        grid-column-start: 5;
        grid-column-end: 7;
        grid-row-start: 1;
        grid-row-end: 3;
    }

    .totes {
        grid-column-start: 7;
        grid-column-end: 9;
        grid-row-start: 1;
        grid-row-end: 3;
    }

    .quilts {
        grid-column-start: 5;
        grid-column-end: 7;
        grid-row-start: 3;
        grid-row-end: 5;
    }

    .accessories {
        grid-column-start: 7;
        grid-column-end: 9;
        grid-row-start: 3;
        grid-row-end: 5;
    }
  }

  @media only screen and (min-width: 1280px) {
    padding: 0 5rem;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(4, 8vw);
    .backpacks {
        grid-column-start: 1;
        grid-column-end: 5;
        grid-row-start: 1;
        grid-row-end: 5;
    }
    .handbags {
        grid-column-start: 5;
        grid-column-end: 7;
        grid-row-start: 1;
        grid-row-end: 3;
    }

    .totes {
        grid-column-start: 7;
        grid-column-end: 9;
        grid-row-start: 1;
        grid-row-end: 3;
    }

    .quilts {
        grid-column-start: 5;
        grid-column-end: 7;
        grid-row-start: 3;
        grid-row-end: 5;
    }

    .accessories {
        grid-column-start: 7;
        grid-column-end: 9;
        grid-row-start: 3;
        grid-row-end: 5;
    }
    
  }
`
const CategoryItem = styled.a`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block; 
    margin: 0px;
    position: relative;
    cursor: pointer;
`

const  ShopButton = styled.div`
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -80%);  // horizontally, vertically
`
const ShopButtonLink = styled.div`
    color: white;
    background-color: rgba(40,44,52, 0.6);
    width: 136px;
    display: inline-block;
    padding: 12px 0;
    margin: 0 auto;
    cursor: pointer;
    font-size: 1.1rem;
    text-align: center;
    text-decoration: none;
    
    &:hover{
      background-color: rgba(40,44,52, 0.9);
    }
`
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;


`