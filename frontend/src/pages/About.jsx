import styled from "styled-components";
import { PageText, PageTitle, PageTittleContainer} from "./Contact";
import {useEffect, useState} from "react";
import {publicApi} from "../api";

export default function About() {
    const [aboutParagraphs, setAboutParagraphs] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getAboutParagraphs() {
            try {
                setLoading(true)
                const res = await publicApi.get(`/about/`)
                const result = res.data
                setAboutParagraphs(result)
            } catch (error) {
                console.log("failed to get about paragraphs",  error.response.data)
            } finally {
                setLoading(false)
            }
        }
        getAboutParagraphs()
    }, [])

    if (loading) return null

    return (
        <Section className="about-paragraph-section">
            <Inner>

                <PageTittleContainer className="about-paragraph-title-container">
                    <PageTitle>About Us</PageTitle>
                </PageTittleContainer>

                <AboutParagraphsList className="about-paragraph-list">
                    {aboutParagraphs?.map((paragraph, index) => {

                        return (
                            <AboutParagraphItem
                                className="about-paragraph-item"
                                key={index} $reverse={index % 2 !== 0}
                            >
                                <ImageContainer className="paragraph-iamge-container">
                                    <Img src={paragraph?.paragraph_image} alt="about image" loading="eager"/>
                                </ImageContainer>
                                <TextContainer className="paragraph-text-container">
                                    <ParagraphTitle>{paragraph?.title}</ParagraphTitle>
                                    <PageText>{paragraph?.paragraph}</PageText>
                                </TextContainer>


                            </AboutParagraphItem>
                        )
                    })}
                </AboutParagraphsList>




            </Inner>
        </Section>
    )
}
const Section = styled.section`
  width: 100%;
`;

const Inner = styled.div`
  width: min(1400px, calc(100% - 3rem));
  margin: 0 auto;
`;

const AboutParagraphsList = styled.ul`
    list-style-type: none;
  padding-left: 0;
`
const AboutParagraphItem = styled.li`
  display: flex;
  align-items: center;
  gap: 5rem;
  margin: 5rem 0;
  flex-direction: ${({ $reverse }) => ($reverse ? "row-reverse" : "row")};

  @media (max-width: 868px) {
    flex-direction: column; // stack on mobile
  }
`
const TextContainer = styled.div`
  flex: 1;
`;
const ParagraphTitle = styled.h1`
  font-size: 2rem;
  text-align: center;
`
const ImageContainer = styled.div`
  flex: 1;
  aspect-ratio: 1 / 1;
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;