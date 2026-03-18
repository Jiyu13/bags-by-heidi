import {ProductImagesSection} from "../components/bag-detail/ProductImagesSection";
import styled from "styled-components";
import {useContext, useEffect, useState} from "react";
import {publicApi} from "../api";
import {UserContext} from "../user-content/UserContent";
import {useParams} from "react-router-dom";

export default function BagDetailPage() {
    const {isMobile} = useContext(UserContext)

    const [productDetail, setProductDetail] = useState(null)

    const {id} = useParams()


    useEffect(() => {
        async function getDetail() {
            try {
                const res = await publicApi.get(`/product/${id}/`)
                const product = res.data
                setProductDetail(product)
            } catch (error) {
                console.log("failed to get products",  error.response.data)
            }
        }
        getDetail()
    }, [id])


    return (
        <DetailPageContainer className='product-detail-page'>
            <DetailPageWrapper $isMobile={isMobile}>
                <ImagesColumn >
                    <ProductImagesSection
                        coverImage={productDetail?.image}
                        otherImages={productDetail?.product_images}
                    />
                </ImagesColumn>

                {/* =================== Detail ================*/}
                <DetailSection $isMobile={isMobile} className='detail-section'>
                    <ProductTitle>{productDetail?.title}</ProductTitle>
                    <p>
                        description: The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum.
                    </p>

                    <DescriptionContainer className='description-container'>
                        <ul style={{paddingLeft: "20px"}}>
                            <DescriptionItem>Can put material here</DescriptionItem>
                            <DescriptionItem>Bag dimensions</DescriptionItem>
                            <DescriptionItem>other features</DescriptionItem>

                        </ul>
                    </DescriptionContainer>

                </DetailSection>

            </DetailPageWrapper>
        </DetailPageContainer>
    )
}

const DetailPageContainer = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 1440px;
  padding: 2rem 5rem 2.5rem;
  transition: margin-top 2s ease-in-out .5s;
  
  @media (max-width: 868px) {
    padding: 0 1.5rem 1.85rem;
  }
  
`

const DetailPageWrapper = styled.div`
    display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: ${({ $isMobile }) => ($isMobile ? "column" : "row")};
`
const ImagesColumn = styled.div`
  width: 50%;
  @media (max-width: 868px) {
    width: 100%;
  }
`;

const DetailSection = styled.div`
  width: 35%;
  padding-left: 1.8rem;
  position: sticky;
  top: 8rem;
  align-self: flex-start;

  @media (max-width: 868px) {
    width: 100%;
    padding-left: 0;
    position: static;
    top: auto;
    align-self: center;
  }
`;

const ProductTitle = styled.h1`
  font-size: 2rem;
  margin-top: 0;
  margin-bottom: 1rem;
`
const DescriptionContainer = styled.div`
    color: rgba(40,44,52, 0.6);
    font-size: 0.9rem;
    border-top: 1px solid #eaeaea;

`

const DescriptionItem = styled.li`
  margin: 12px 0;
  line-height: 1.5;
`