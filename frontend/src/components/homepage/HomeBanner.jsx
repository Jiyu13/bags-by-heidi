import styled from "styled-components";
import {UserContext} from "../../user-content/UserContent";
import {useContext, useState} from "react";

export default function HomeBanner() {

    const {topBanner} = useContext(UserContext)
    const [loaded, setLoaded] = useState(false)

    return (
        <SectionImageContainer className="section-image-container">
            <Img
                src={topBanner?.banner_image}
                alt="section-image"
                loading="eager"
                decoding="async"
                $loaded={loaded}
                onLoad={() => setLoaded(true)}
            />

            {/*<Overlay />*/}
            <SectionContent>
               <Title>{topBanner?.title}</Title>
               <Description>{topBanner?.description}</Description>
            </SectionContent>
        </SectionImageContainer>
    )
}
const SectionImageContainer = styled.section`
  position: relative;
  width: 100%;
  min-height: 580px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;


  @media (max-width: 992px) {
    min-height: 580px;
  }

  @media (max-width: 768px) {
    min-height: 420px;
  }

  @media (max-width: 480px) {
    min-height: 360px;
  }
`;

export const Img = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${props => (props.$loaded ? 1 : 0)};
  transition: opacity 0.6s ease;

`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.28);
`;

export const SectionContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 900px;
  padding: 0 1.5rem;
  text-align: center;
  color: white;
`;

export const Title = styled.h2`
  font-family: "Meddon", cursive;
  font-weight: 400;
  font-style: normal;
  font-size: 4.5rem;
  line-height: 1.1;
  margin: 0 0 1rem;

  @media (max-width: 992px) {
    font-size: 3.6rem;
  }

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }

  @media (max-width: 480px) {
    font-size: 2.1rem;
  }
`;

export const Description = styled.p`
  margin: 0 auto;
  max-width: 640px;
  font-size: 1.05rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 0.98rem;
  }

  @media (max-width: 480px) {
    font-size: 0.92rem;
  }
`;
