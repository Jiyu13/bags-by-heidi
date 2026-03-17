import styled from "styled-components";
import logo from "../../assets/logo/logo.svg"
import {UserContext} from "../../user-content/UserContent";
import {useContext, useEffect, useState} from "react";
import MobileMenuBtn from "./MobileMenuBtn";
import MobileMenu from "./MobileMenu";


function Header() {

    const { isMobile, isTablet } = useContext(UserContext)

    const [isOpenMenu, setOpenMenu] = useState(false)
    function handleOpenHeaderMenu() {
        setOpenMenu(!isOpenMenu)
    }

    useEffect(() => {
        if (!isMobile) {
            setOpenMenu(false)
        }
    }, [isMobile]);


    return (
        <HeaderContainer className="heading-container">
            <HeaderWrapper className="heading-wrapper">

                <LeftSection>
                    <a href ="/" style={{textDecoration:'none', color: "inherit"}}>
                        <LogoWrapper>
                            <LogoImg>
                                <img src={logo} alt="bags by heidi logo" style={{backgroundColor: "transparent"}}/>
                            </LogoImg>
                        </LogoWrapper>
                    </a>
                </LeftSection>



                {/* call NavLinks component */}
                {isTablet ?
                    <MobileMenuBtn
                      isOpenMenu={isOpenMenu}
                      handleOpenHeaderMenu={handleOpenHeaderMenu}
                    />
                    :
                    <RightSection>
                        <NavLinksContainer>
                            <LinksWrapper>

                                <LinkItem>
                                    <Link href="/">Home</Link>
                                </LinkItem>

                                {/*{productCategories?.map((category, index) => {*/}
                                {/*    const category_name = category?.category*/}
                                {/*    const lowercase = category_name.toLowerCase()*/}
                                {/*    return (*/}

                                {/*        <LinkItem>*/}
                                {/*            <Link href={`/shop/${lowercase}`} key={category?.id}>{category_name}</Link>*/}
                                {/*        </LinkItem>*/}
                                {/*    )*/}
                                {/*})}*/}


                                <LinkItem>
                                    <Link href="/shop/backpacks">Backpacks</Link>
                                </LinkItem>
                                 <LinkItem>
                                    <Link href="/shop/handbags">Handbags</Link>
                                </LinkItem>
                                 <LinkItem>
                                    <Link href="/shop/totes">Totes</Link>
                                </LinkItem>
                                 <LinkItem>
                                    <Link href="/shop/fun-accessories">Fun Accessories</Link>
                                </LinkItem>

                                <LinkItem>
                                    <Link href="/gallery"  >Gallery</Link>
                                </LinkItem>
                                <LinkItem>
                                    <Link href="about" >About</Link>
                                </LinkItem>
                                <LinkItem>
                                    <Link href="contact" >Contact</Link>
                                </LinkItem>
                                {/*<LinkItem>*/}
                                {/*    <Link href="login">Login</Link>*/}
                                {/*</LinkItem>*/}

                            </LinksWrapper>
                        </NavLinksContainer>
                    </RightSection>

                }

                {isOpenMenu && (
                    <MobileMenu
                       isOpenMenu={isOpenMenu}
                       handleOpenHeaderMenu={handleOpenHeaderMenu}
                    />
                )}

            </HeaderWrapper>
        </HeaderContainer>
    )

}

const HeaderContainer = styled.header`
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    top: 0;
    left: 0;
    // prevent padding from making 100% width extend beyond screen
    box-sizing: border-box;
    position: fixed;
    z-index: 1000;   // make navbar on top of articleList when scrolling down
    padding: 2rem;
  background-color: #fff;

    
  border-bottom: 1px solid rgba(143, 143, 143, 0.5);
`
const HeaderWrapper = styled.div`
  width: 100%;
  //padding: 0 1.5em;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const LeftSection = styled.div`
    display: flex;
`;
const RightSection = styled.div`
    display: flex;
    //flex: 2;
    height: 100%;
    justify-content: center;
`;

// Logo Wrapper
const LogoWrapper = styled.div`
    display: flex;
    align-items: center;

`

const LogoImg = styled.div`
    //width: 36px;
    height: 110px;

    img {
        width: 100%;
        height: 100%
    }
`

const NavLinksContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
`;

const LinksWrapper = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    height: 100%;
    list-style: none;
`;

// render a single link, click and redirect to a specific page
const LinkItem = styled.li`
  height: 100%;
  padding: 0 1rem;
  font-weight: 500;
  font-size: 1rem;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  //background-color: #212121;
  width: 100%;
  white-space: nowrap;
  
  // avoid link goes down when hover
  transition: all 220 mx ease-in-out;
`;

const Link = styled.a`
  text-decoration: none;
  color: rgb(72, 72, 72);;
  font-size: inherit;


  &:hover {
    color: rgba(23, 23, 23, 1);
    //transform: scale(1.1);
  }
`;

export default Header;
