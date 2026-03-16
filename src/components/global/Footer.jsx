import styled from "styled-components";
import instagram_icon from "../../assets/images/instagram.svg"
import facebook_icon from "../../assets/images/square-facebook.svg"
export function Footer() {
    return (
        <FooterContainer>
            <FooterInner>
                {/*<FooterTop>*/}
                {/*    <FooterColumn>*/}
                {/*        <FooterHeading>Follow </FooterHeading>*/}
                {/*        <FooterList>*/}
                {/*            <FooterItem><FooterLink href="/contact">Contact</FooterLink></FooterItem>*/}
                {/*            <FooterItem><FooterLink href="">Shipping & Returns</FooterLink></FooterItem>*/}
                {/*            <FooterItem><FooterLink href="">Newsletter</FooterLink></FooterItem>*/}
                {/*        </FooterList>*/}
                {/*    </FooterColumn>*/}

                {/*    <FooterColumn>*/}
                {/*        <FooterHeading>Shop</FooterHeading>*/}
                {/*        <FooterList>*/}
                {/*            <FooterItem><FooterLink href="/shop/earrings">Earrings</FooterLink></FooterItem>*/}
                {/*            <FooterItem><FooterLink href="/shop/rings">Rings</FooterLink></FooterItem>*/}
                {/*            <FooterItem><FooterLink href="/shop/necklaces">Necklaces</FooterLink></FooterItem>*/}
                {/*            <FooterItem><FooterLink href="/shop/bracelets">Bracelets</FooterLink></FooterItem>*/}
                {/*        </FooterList>*/}
                {/*    </FooterColumn>*/}

                {/*    <FooterColumn>*/}
                {/*        <FooterHeading>Company</FooterHeading>*/}
                {/*        <FooterList>*/}
                {/*            <FooterItem><FooterLink href="">About</FooterLink></FooterItem>*/}
                {/*            <FooterItem><FooterLink href="">Privacy Policy</FooterLink></FooterItem>*/}
                {/*            <FooterItem><FooterLink href="">Terms</FooterLink></FooterItem>*/}
                {/*        </FooterList>*/}
                {/*    </FooterColumn>*/}
                {/*</FooterTop>*/}

                <SocialRow>
                    <SocialMediaIcons>
                        <SocialLink href="">
                            <SocialIcon src={instagram_icon} alt="Instagram" />
                        </SocialLink>

                        <SocialLink href="">
                            <SocialIcon src={facebook_icon} alt="Facebook" />
                        </SocialLink>
                    </SocialMediaIcons>
                </SocialRow>

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
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;

const Copyright = styled.small`
  color: #b8b8b8;
  font-size: 0.9rem;
`;