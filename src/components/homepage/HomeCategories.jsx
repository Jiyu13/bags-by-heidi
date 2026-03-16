import backpacks  from '../../assets/images/backpack.jpg'
import handbags from '../../assets/images/handbag.jpg'
import totes from '../../assets/images/tote.jpg'
import accessories from '../../assets/images/accessories.jpg'
import styled from "styled-components";


export function HomeCategories() {
    return (
        <CategoryContainer className='category-container'>

            <CategoryItem className="backpacks" href={'/shop/backpacks'}>
                <Img src={backpacks} alt="backpacks"/>
                <ShopButton>
                    <ShopButtonLink href={'/shop/backpacks'}>Backpacks</ShopButtonLink>
                </ShopButton>
            </CategoryItem>

            <CategoryItem className="handbags" href={'/shop/handbags'}>
                <Img src={handbags} alt="handbags"/>
                <ShopButton>
                    <ShopButtonLink href={'/shop/handbags'}>Handbags</ShopButtonLink>
                </ShopButton>
            </CategoryItem>


            <CategoryItem className="totes" href={'/shop/totes'}>
                <Img src={totes} alt="totes"/>
                <ShopButton>
                    <ShopButtonLink href={'/shop/totes'}>Totes</ShopButtonLink>
                </ShopButton>
            </CategoryItem >


            <CategoryItem className="accessories" href={'/shop/accessories'}>
                <Img src={accessories} alt="accessories"/>
                <ShopButton>
                    <ShopButtonLink href={'/shop/accessories'}>Fun Accessories</ShopButtonLink>
                </ShopButton>
            </CategoryItem>



        </CategoryContainer>
    )
}

const CategoryContainer = styled.div`
  display: grid;
  grid-gap: 15px;
  margin: 0 auto;
  max-width: 1440px;
  box-sizing: border-box;
  
  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(8, 10vw);

    .backpacks {
      grid-column: 1 / 5;
      grid-row: 1 / 5;
    }

    .handbags {
      grid-column: 5 / 9;
      grid-row: 1 / 5;
    }

    .totes {
      grid-column: 1 / 5;
      grid-row: 5 / 9;
    }

    .accessories {
      grid-column: 5 / 9;
      grid-row: 5 / 9;
    }
  }

  @media only screen and (min-width: 769px) and (max-width: 989px) {
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(2, 12vw);

    .backpacks {
      grid-column: 1 / 3;
      grid-row: 1 / 3;
    }

    .handbags {
      grid-column: 3 / 5;
      grid-row: 1 / 3;
    }

    .totes {
      grid-column: 5 / 7;
      grid-row: 1 / 3;
    }

    .accessories {
      grid-column: 7 / 9;
      grid-row: 1 / 3;
    }
  }

  @media only screen and (min-width: 990px) {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 300px;

    .backpacks,
    .handbags,
    .totes,
    .accessories {
      grid-column: span 1;
      grid-row: span 1;
    }
  }

  @media only screen and (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 350px;
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
const ShopButtonLink = styled.a`
    color: white;
    background-color: rgba(40,44,52, 0.6);
    width: 136px;
    display: inline-block;
    padding: 12px 0;
    margin: 0 auto;
    cursor: pointer;
    font-size: 0.9rem;
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

`