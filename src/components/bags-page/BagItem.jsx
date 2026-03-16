import styled from "styled-components";
import {useNavigate} from "react-router-dom";

export default function BagItem({product}) {

    const navigate = useNavigate()
    const formattedProductName = product?.title.split(" ").join("-").toLowerCase()

    function handleGoToProductDetail() {
        navigate(`/bag/${product.id}/${formattedProductName}`)
    }

    return (
        <ItemContainer onClick={handleGoToProductDetail} id={product?.id}>
            <ItemCard
                className="product-item"
                id={product?.id}
            >
                <ProductImage className="product-image-container">

                    {product?.image && (
                        <Img
                            src={product?.image}
                            alt={product?.title}
                        />
                    )}

                </ProductImage>

                <ProductContent className="product-content-container">
                    <ProductTitle>{product?.title}</ProductTitle>
                </ProductContent>
            </ItemCard>
        </ItemContainer>
    )
}

const ItemContainer = styled.li`
  box-sizing: border-box;
  //flex: 0 0 calc(25% - 1.2rem);
  flex: 0 0 calc((100% - 3 * 1.5rem) / 4);
  border: 1px solid rgba(2, 2, 2, 0.1);
  transition: box-shadow 0.25s ease;
  background: rgb(255, 255, 255);
  
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
  }
  
  @media (max-width: 988px) {
    flex: 0 0 calc((100% - 2 * 1.5rem) / 3);
  }
  
  @media (max-width: 699px) {
    flex: 0 0 calc((100% - 1.5rem) / 2);
  }
`
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
`
const Img = styled.img`
    cursor: pointer;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    display: block;
    height: auto;
    object-fit: contain;
`

const ProductContent = styled.div`
  padding: 0.8rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`

const ProductTitle = styled.h3`
    font-size: 1rem;
  font-weight: 500;
  line-height: 1.4;
  margin: 0;
`