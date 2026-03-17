import styled from "styled-components";
import brand_story from "../../assets/images/brand-story.jpeg"
import {useContext} from "react";
import {UserContext} from "../../user-content/UserContent";

export default function BrandStory() {

  const {aboutBrand} = useContext(UserContext)

  return (
    <Section>
      <Wrapper>
        <Row>

          <TextColumn>
            <TextContent>
              <Title>{aboutBrand?.title}</Title>

              <Description>{aboutBrand?.description}</Description>

              <Link href="/about">Learn more</Link>
            </TextContent>
          </TextColumn>

          <ImageColumn>
            <Img src={aboutBrand?.banner_image} alt="Brand story" />
          </ImageColumn>

        </Row>
      </Wrapper>
    </Section>
  );
}
const Section = styled.section`
  background: #f7f4ef;
  padding: 3rem 0;
`;

const Wrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;

  @media (min-width: 989px) {
    padding: 0 5rem;
  }

  @media (max-width: 988px) {
    padding: 0 1.5rem;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: stretch;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TextColumn = styled.div`
  background: white;
  display: flex;
  align-items: center;
  padding: 3rem;
  box-shadow: 0 6px 16px rgba(0,0,0,0.08);

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const TextContent = styled.div`
  max-width: 480px;
`;

const Title = styled.h2`
  margin: 0 0 1rem;
  font-size: 1.9rem;
  font-weight: 500;
`;

const Description = styled.p`
  margin: 0 0 1rem;
  line-height: 1.6;
  color: #444;
`;

const Link = styled.a`
  font-weight: 500;
  text-decoration: underline;
  color: #000;
`;

const ImageColumn = styled.div`
  overflow: hidden;
    max-height: 420px;

`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;