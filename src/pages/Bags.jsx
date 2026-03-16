
import {useContext} from "react";

import styled from "styled-components";
import {UserContext} from "../user-content/UserContent";
import {useNavigate} from "react-router-dom";
import BagItem from "../components/bags-page/BagItem";


export default function Bags() {

    const {products, setProducts} = useContext(UserContext)

    return (
        <ProductPageContainer className='product-page-container'>
            {/*<FilterTriggerMenu*/}
            {/*    products={products}*/}
            {/*    // handleSort={handleSort}*/}
            {/*/>*/}

            <ListContainer className="product-list">
                {Array.from({ length: 7 }).map((_, i) => {
                    const product = products?.[0];
                // {products?.map((product, index) => {
                    return (
                        <BagItem
                            key={{i}}
                            product={product}
                        />
                    )

                })}

            </ListContainer>
        </ProductPageContainer>

    )
}

const ProductPageContainer = styled.div`
  margin: 60px auto 0;
  box-sizing: border-box;
  width: 100%;
  max-width: 1400px;
  
  @media (min-width: 989px) {
      padding: 0 5rem;
  }
  
  @media (max-width: 988px) {
      padding: 0 1.5rem;
  }
`
const ListContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
  --gap: 1.5rem;
  gap: var(--gap);
`

