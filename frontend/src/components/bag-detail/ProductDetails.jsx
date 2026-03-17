
import {ProductDescription} from "./ProductDescription";
import styled from "styled-components";
import {useContext} from "react";
import {UserContext} from "../../user-content/UserContent";

export function ProductDetails({productDetail}) {

    const {isMobile} = useContext(UserContext)


    return (
        <div style={{
            width: isMobile ? "100%" : "35%",
            paddingLeft: isMobile ? "0" : "30px"
        }}
        >
            <div style={{}}>
                <ProductTitle>{productDetail?.title}</ProductTitle>
            </div>

            <div>
                {/*=================== get from productDetail.description ========*/}
                <ProductDescription/>
            </div>

        </div>
    )
}

const ProductTitle = styled.h1`
  font-size: 2rem;
  margin-top: 0;
  margin-bottom: 15px;
`