import {ProductImagesSection} from "../components/bag-detail/ProductImagesSection";
import styled from "styled-components";
import {useContext, useEffect, useState} from "react";
import {publicApi} from "../api";
import {UserContext} from "../user-content/UserContent";
import {useParams} from "react-router-dom";
import {ButtonRow, SubmitInputButton} from "./Contact";
import PopupEnquiryForm from "../components/bag-detail/PopupEnquiryForm";

export default function BagDetailPage() {
    const {isMobile} = useContext(UserContext)
    const {id} = useParams()


    const [productDetail, setProductDetail] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

    useEffect(() => {
        async function getDetail() {
            try {
                setLoading(true)
                const res = await publicApi.get(`/product/${id}/`)
                const product = res.data
                setProductDetail(product)
            } catch (error) {
                console.log("failed to get products",  error.response.data)
            } finally {
                setLoading(false)
            }
        }
        getDetail()
    }, [id])

    function handleMakeEnquiry() {
        setIsEnquiryOpen(true)
    }

    if (loading) {return null}

    return (
        <DetailPageContainer className='product-detail-page'>
            <DetailPageWrapper $isMobile={isMobile} className='detail-wrapper'>
                <ImagesColumn className='image-column'>
                    <ProductImagesSection
                        coverImage={productDetail?.image}
                        otherImages={productDetail?.product_images}
                    />
                </ImagesColumn>

                {/* =================== Detail ================*/}
                <DetailSection $isMobile={isMobile} className='detail-section'>
                    <ProductTitle>{productDetail?.title}</ProductTitle>
                    <ProductPrice>${productDetail?.price}</ProductPrice>

                    {/* --------------- a send an email button ---------------------------*/}
                    <EnquiryContainer className="make-an-enquiry-container">
                        <EnquiryText className="enquiry-text">For more details:</EnquiryText>
                        <EnquiryButtonContainer className="enquiry-button-container">
                            <EnquiryButton
                                className="enquiry-button"
                                type="button"
                                value="Make An Enquiry"
                                onClick={handleMakeEnquiry}
                            />
                        </EnquiryButtonContainer>
                    </EnquiryContainer>

                    <ProductDescription>
                        {productDetail?.description}
                    </ProductDescription>

                    <DescriptionContainer className='description-container'>
                        <ul style={{paddingLeft: "20px"}}>
                            <DescriptionItem>
                                <DescriptionSpan>Material:</DescriptionSpan>
                                {productDetail?.material}
                            </DescriptionItem>
                            <DescriptionItem>
                                <DescriptionSpan>Dimensions:</DescriptionSpan>
                                {productDetail?.size}

                            </DescriptionItem>

                        </ul>
                    </DescriptionContainer>

                </DetailSection>

            </DetailPageWrapper>

            {isEnquiryOpen && (
                <PopupEnquiryForm
                    isOpen={isEnquiryOpen}
                    onClose={() => setIsEnquiryOpen(false)}
                    productTitle={productDetail?.title}
                />
            )}

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
  width: 55%;
  @media (max-width: 868px) {
    width: 100%;
  }
`;

const DetailSection = styled.div`
  width: 45%;
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
const ProductPrice = styled.p`
  font-size: 1.2rem;
`
const ProductDescription = styled.p`
  padding: 1rem 0;
`
const EnquiryContainer = styled.div`
    margin: 1.5rem 0 0;
    padding: 1.5rem 0 0;
    border-top: 1px solid rgb(211, 211, 211);
  
`
const EnquiryText = styled.div`
  font-size: 0.9rem;
  margin: 0.2rem 0 0.5rem;
`
const EnquiryButtonContainer = styled(ButtonRow)`
  
`
const EnquiryButton = styled(SubmitInputButton)`
  margin: 0;
`
const DescriptionContainer = styled.div`
  color: rgba(40, 44, 52, 0.6);
  font-size: 0.9rem;
`

const DescriptionItem = styled.li`
  margin: 12px 0;
  line-height: 1.5;
`
const DescriptionSpan = styled.span`
  font-weight: Bold;
  color: #13141b;
`