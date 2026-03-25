import {useContext, useEffect, useState} from "react";

import styled from "styled-components";
import {UserContext} from "../user-content/UserContent";
import {useNavigate, useParams} from "react-router-dom";
import BagItem from "../components/bags-page/BagItem";
import {publicApi} from "../api";
import {Img, SectionContent, Title} from "../components/homepage/HomeBanner";
import {upperCategoryName} from "../utils/cleanCategoryName";
import {BannerSkeleton} from "../components/skeletons/skeletons";

export default function Bags() {
    const {productCategories} = useContext(UserContext)
    const [items, setItems] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [loadingPage, setLoadingPage] = useState(true)



    const { category_name } = useParams()
    const categoryName = upperCategoryName(category_name)
    const currentCategory = productCategories?.filter((p, index) => p.category === categoryName)[0]

    useEffect(() => {
        async function getProductCategories() {
            try {
                setLoadingPage(true)

                const res = await publicApi.get(`/products/${category_name}/`)
                const result = res.data
                setItems(result)
            } catch (error) {
                console.log("failed to get products",  error.response.data)
            } finally {
                setLoadingPage(false)
            }
        }
        getProductCategories()
    }, [category_name])

    useEffect(() => {
        setLoaded(false)
    }, [category_name])

    if (loadingPage) {return null}

    return (
        <ProductPageContainer className='product-page-container'>
            <ProductPageBannerContainer className="category-cover-image-container">
                {!loaded && <BannerSkeleton />}

                <Img
                    src={currentCategory?.cover_image}
                    alt="category-cover-image"
                    loading="eager"
                    decoding="async"
                    $loaded={loaded}
                    onLoad={() => setLoaded(true)}
                />
                {/*<Overlay />*/}
                <ProductPageTittleWrapper className="category-tittle-wrapper">
                   <ProductPageTittle>{currentCategory?.category}</ProductPageTittle>
                   {/*<Description>{topBanner?.description}</Description>*/}
                </ProductPageTittleWrapper>
            </ProductPageBannerContainer>

            {items && (
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
            )}
        </ProductPageContainer>



    )
}

const ProductPageContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
`
const ProductPageBannerContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 420px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(244, 245, 234, 1);
  object-fit: cover;

  @media (max-width: 992px) {
    min-height: 420px;
  }

  @media (max-width: 768px) {
    min-height: 360px;
  }

  @media (max-width: 480px) {
    min-height: 300px;
  }
`
const ProductPageTittleWrapper = styled(SectionContent)`
  width: auto;
  z-index: 3;
`
const ProductPageTittle = styled(Title)`
  background-color: rgba(40, 44, 52, 0.5);
  color: rgba(255, 255, 255, 0.7);
  font-weight: Bold;
  font-family: inherit;
  font-size: 3.5rem;
  margin-bottom: 0;
  padding: 0.5rem;
  border-radius: 8px;
  border: none;
  @media (max-width: 992px) {
    font-size: 3rem;
  }

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`
const ListContainer = styled.ul`
    margin: 60px auto 0;

  @media (min-width: 989px) {
      padding: 0 5rem;
  }
  
  @media (max-width: 988px) {
      padding: 0 1.5rem;
  }
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  //margin: 0;
  --gap: 1.5rem;
  gap: var(--gap);
`

