import {useContext, useEffect, useState} from "react";

import styled from "styled-components";
import {UserContext} from "../user-content/UserContent";
import {useNavigate, useParams} from "react-router-dom";
import BagItem from "../components/bags-page/BagItem";
import {publicApi} from "../api";


export default function Bags() {

    const [items, setItems] = useState(null)


    const { category_name } = useParams()

    useEffect(() => {
        async function getProductCategories() {
            try {
                const res = await publicApi.get(`/products/${category_name}/`)
                const result = res.data
                setItems(result)
            } catch (error) {
                console.log("failed to get products",  error.response.data)
            }
        }
        getProductCategories()
    }, [category_name])


    return (
        <>
            {items && (
                 <ProductPageContainer className='product-page-container'>
                    <ListContainer className="product-list">
                        {items?.map((item, i) => {
                            return (
                                <BagItem
                                    key={item.id}
                                    product={item}
                                />
                            )

                        })}
                    </ListContainer>
                </ProductPageContainer>
            )}
        </>



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

