import about_image from "../assets/images/about-image.jpg";
import styled from "styled-components";
import {PageContainer, PageText, PageTitle, PageWrapper} from "./Contact";

export default function About() {
    return (
        <PageContainer style={{display: "flex"}}>
            <PageWrapper>

                <PageTitle>OUR STORY</PageTitle>

                <TextContainer>
                    <PageText>Description about your and your products. </PageText>
                    <PageText>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </PageText>
                </TextContainer>

                <ImageContainer>
                    <Img src={about_image} alt="about image"/>
                </ImageContainer>

            </PageWrapper>
        </PageContainer>
    )
}


const TextContainer = styled.div`
  margin-top: 2rem;
`;

const ImageContainer = styled.div`
  margin-top: 2.5rem;
`;

const Img = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: 4px;
`;