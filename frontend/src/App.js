import styled from "styled-components";

import {Route, Routes} from "react-router-dom";
import {UserContext} from "./user-content/UserContent";
import Header from "./components/global/Header";
import Home from "./pages/Home";
import {useEffect, useState} from "react";
import About from "./pages/About";
import Contact from "./pages/Contact";
import {Login} from "./pages/Login";
import api, {publicApi} from "./api";
import Bags from "./pages/Bags";
import {Footer} from "./components/global/Footer";
import {useMediaQuery} from "react-responsive";
import BagDetailPage from "./pages/BagDetailPage";


function App() {

    const [isAuthorized, setIsAuthorized] = useState(null)
    const [topBanner, setTopBanner] = useState(null)
    const [aboutBrand, setAboutBrand] = useState(null)
    const [customerFeedback, setCustomerFeedback] = useState(null)

    const [productCategories, setProductCategories] = useState(null)
    const [products, setProducts] = useState(null)

    // ========================== get homepage sections =================
    useEffect(() => {
        async function getSections() {
            try {
                const res = await publicApi.get("/homepage_sections/")
                const sections = res.data
                setTopBanner(sections[0])
                setAboutBrand(sections[1])
                setCustomerFeedback(sections[2])
            } catch (error) {
                console.log("failed to get products",  error.response.data)
            }
        }
        getSections()
    }, [])


    // ========================== get product categories ==========================
    useEffect(() => {
        async function getProductCategories() {
            try {
                const res = await publicApi.get("/product_categories/")
                const categories = res.data
                setProductCategories(categories)
            } catch (error) {
                console.log("failed to get products",  error.response.data)
            }
        }
        getProductCategories()
    }, [])

    // ========================== get products ==========================
    useEffect(() => {
        async function getProducts() {
            try {
                const res = await publicApi.get("/products/")
                const products = res.data
                setProducts(products)
            } catch (error) {
                console.log("failed to get products",  error.response.data)
            }
        }
        getProducts()
    }, [])

   const isTablet = useMediaQuery({query: "(max-width: 1024px)" })
    const isMobile = useMediaQuery({query: "(max-width: 868px)" })


    const userContextValue = {
        isAuthorized, setIsAuthorized,
        products, setProducts,
        isMobile, isTablet,
        topBanner, aboutBrand, customerFeedback, productCategories
    }


    return (
        <UserContext.Provider value={userContextValue}>
            <PageContainer>
                {/*<Header />*/}

                <Header/>


                {/*{!isLaptop && (*/}
                {/*    <MobileMenuBtn*/}
                {/*      isOpenMenu={isOpenMenu}*/}
                {/*      handleOpenHeaderMenu={handleOpenHeaderMenu}*/}
                {/*    />*/}
                {/*)}*/}

                {/* keep MobileMenu mounted, it is mounting only when isOpenMenu is true */}
                {/*<MobileMenu*/}
                {/*   isOpenMenu={isOpenMenu}*/}
                {/*   handleOpenHeaderMenu={handleOpenHeaderMenu}*/}
                {/*/>*/}


                <Main>
                {/*  <Outlet />*/}

                    <Routes>
                        <Route exact path="/about" element={<About />}/>
                        <Route exact path="/contact" element={<Contact />} />
                        <Route exact path='/login' element={<Login />} />
                        {/*<Route exact path='/fun_accessories' element={<Bags />} />*/}
                        {/*<Route exact path='/totes' element={<Bags />} />*/}
                        {/*<Route exact path='/backpacks' element={<Bags />} />*/}
                        {/*<Route exact path='/handbags' element={<Bags />} />*/}
                        <Route exact path='/shop/:category_name' element={<Bags />} />

                        <Route exact path="/" element={<Home />}/>
                        {/*<Route exact path="/bag/:id/:product_name" element={<BagDetailPage />}/>*/}


                        {/*<Route exact path="*" element={< />}/>*/}
                        {/*<Route exact path="/register" element={<Register />}/>*/}
                        {/*<Route exact path="/login" element={<Login />}/>*/}

                        {/*<Route element={<ProtectedRoutes/>}>*/}
                        {/*     <Route exact path="/" element={<Home />}/>*/}
                        {/*     <Route exact path='/article/:article_title/:article_id' element={<Article />} />*/}
                        {/*     <Route exact path='/article/add' element={<ArticleCreate />} />*/}
                        {/*</Route>*/}

                    </Routes>
                </Main>

                <Footer/>

            </PageContainer>

        </UserContext.Provider>
    );
}

const PageContainer = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;

`
const Main = styled.main`
    //min-height: calc(100vh - 120px);
    width: 100%;
    margin: 120px auto 0;
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    height: 100%;
`;

export default App;
