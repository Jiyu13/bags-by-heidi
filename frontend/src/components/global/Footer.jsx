import styled from "styled-components";
import instagram_icon from "../../assets/icons/instagram.svg"
import facebook_icon from "../../assets/icons/facebook.svg"
import tiktok_icon from "../../assets/icons/tiktok.svg"
import pinterest from "../../assets/icons/pinterest.svg"
import bags_by_heidi from "../../assets/logo/bags-by-heidi-logo.svg"
import {useContext} from "react";
import {UserContext} from "../../user-content/UserContent";

const SOCIAL_ICONS = {
    instagram: instagram_icon,
    facebook: facebook_icon,
    tiktok: tiktok_icon,
    pinterest: pinterest,
};

export function Footer() {

    const {socialMedias} = useContext(UserContext)

    return (
        <FooterContainer>
            <FooterInner>
                <FooterTop>
                    <FooterColumn>
                        {/*<FooterHeading>About</FooterHeading>*/}
                        <FooterList>
                            <FooterItem><FooterLink href="/">Home</FooterLink></FooterItem>
                            <FooterItem><FooterLink href="/customer-feedback/gallery">Gallery</FooterLink></FooterItem>
                            <FooterItem><FooterLink href="/about">About</FooterLink></FooterItem>
                            <FooterItem><FooterLink href="/contact">Contact</FooterLink></FooterItem>
                        </FooterList>
                    </FooterColumn>

                    <FooterColumn>
                        {/*<FooterHeading>Shop</FooterHeading>*/}
                        <FooterList>
                            <FooterItem><FooterLink href="/shop/backpacks">Backpacks</FooterLink></FooterItem>
                            <FooterItem><FooterLink href="/shop/handbags">Handbags</FooterLink></FooterItem>
                            <FooterItem><FooterLink href="/shop/totes">Totes</FooterLink></FooterItem>
                            <FooterItem><FooterLink href="/shop/quilts">Quilts</FooterLink></FooterItem>
                            <FooterItem><FooterLink href="/shop/fun-accessories">Fun Accessories</FooterLink></FooterItem>
                        </FooterList>
                    </FooterColumn>

                    <FooterColumn>
                        {socialMedias?.length > 0 && (
                            <SocialRow>
                                <LogoImgWrapper>
                                    <img src={bags_by_heidi} alt="bags by heidi logo" style={{backgroundColor: "transparent"}}/>
                                </LogoImgWrapper>
                                <SocialMediaIcons>
                                    {socialMedias?.map((sm, index) => {
                                        if (!sm.is_available) return null;

                                        const iconSrc = SOCIAL_ICONS[sm.name?.toLowerCase()];
                                        return (
                                            <SocialLink
                                                href={sm.link}
                                                key={sm.name}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <SocialIcon src={iconSrc} alt={sm.name} />
                                            </SocialLink>
                                        );
                                    })}
                                </SocialMediaIcons>

                            </SocialRow>

                        )}
                    </FooterColumn>

                </FooterTop>


                <FooterBottom>
                    <Copyright>© 2026 Bags by Heidi · All right reserved.</Copyright>
                </FooterBottom>
            </FooterInner>
        </FooterContainer>
    )
}

const FooterContainer = styled.footer`
  background-color: #2f2f2f;
  color: #d7d7d7;
  margin-top: 4rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;

const FooterInner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 5rem 2rem;

  @media (max-width: 988px) {
    padding: 2.5rem 1.5rem 1.5rem;
  }
`;

const FooterTop = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  justify-content: space-between;
  padding-bottom: 2rem;
  //border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  @media (max-width: 768px) {
    gap: 2rem;
  }
`;

const FooterColumn = styled.div`
  min-width: 180px;
`;

const FooterHeading = styled.h2`
  font-size: 0.95rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #ffffff;
  margin: 0 0 1rem;
`;

const FooterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterItem = styled.li`
  margin-bottom: 0.75rem;
`;

const FooterLink = styled.a`
  text-decoration: none;
  color: #c9c9c9;
  font-size: 0.95rem;
  line-height: 1.5;

  &:hover {
    color: #ffffff;
  }
`;

const SocialRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 0 1.5rem;
`;

const SocialMediaIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.25rem;
`;

const SocialLink = styled.a`
  width: 42px;
  height: 42px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-1px);
  }
`;

const SocialIcon = styled.img`
  width: 18px;
  height: 18px;
  display: block;
  filter: brightness(0) invert(1);
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 1rem;
  border-top: 1.5px solid rgba(255, 255, 255, 0.08);
`;

const Copyright = styled.small`
  color: #b8b8b8;
  font-size: 0.9rem;
`;
const LogoImgWrapper = styled.div`
  width: 100%;
  max-width: 200px;
  margin-bottom: 1rem;

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`