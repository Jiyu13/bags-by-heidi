import styled from "styled-components";
import feed1 from "../../assets/images/feed-1.jpeg"
import feed2 from "../../assets/images/feed-2.jpeg"
import feed3 from "../../assets/images/feed-3.jpeg"
import feed4 from "../../assets/images/brand-story.jpeg"
import feed5 from "../../assets/images/sample (2).jpeg"
import feed6 from "../../assets/images/feed-3.jpeg"
import feed7 from "../../assets/images/feed-3.jpeg"
import feed8 from "../../assets/images/brand-story.jpeg"
import feed9 from "../../assets/images/sample (2).jpeg"
import feed10 from "../../assets/images/feed-3.jpeg"
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../user-content/UserContent";


export default function CustomerFeed() {

    const {customerFeedback, homeCustomerFeedbackSection} = useContext(UserContext)
    const firstTenFeedback = customerFeedback?.slice(0, 10)

    return (
        <FeedSection className="feed-section">
            <FeedInner className="feed-inner">
              <FeedHeader className="feed-header">
                <FeedTitle className="feed-title">{homeCustomerFeedbackSection?.title}</FeedTitle>
                <FeedDescription className="feed-description">
                  {homeCustomerFeedbackSection?.description}
                    <span style={{padding: "0 0.5rem", fontWeight: "Bold"}}>
                        <a
                            style={{color: "inherit", fontSize: "inherit"}}
                            href="/customer-feedback/gallery"
                        >
                            View more here
                        </a>
                    </span>
                </FeedDescription>
              </FeedHeader>

              <FeedGrid className="feed-grid">
                  {firstTenFeedback?.map((fb) => (
                    <FeedItem key={fb.id} href="/customer-feedback/gallery">
                      <FeedImage src={fb.image} alt={fb.alt} />
                    </FeedItem>
                  ))}
              </FeedGrid>

            </FeedInner>
      </FeedSection>
    );
}
const FeedSection = styled.section`
  width: 100%;
  padding: 3rem 0;
  background:transparent;
`;

const FeedInner = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 2rem;
  
`;

const FeedHeader = styled.div`
  text-align: center;
  max-width: 720px;
  margin: 0 auto 2rem;
`;

const FeedTitle = styled.h2`
  margin: 0 0 0.75rem;
  font-size: 2rem;
  font-weight: 500;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.65rem;
  }
`;

const FeedDescription = styled.p`
  margin: 0;
  color: #555;
  line-height: 1.6;
`;

const FeedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  box-sizing: border-box;

  @media (max-width: 1124px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));

    & > *:nth-child(n + 9) {
      display: none;
    }
  }

  @media (max-width: 868px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));

    & > *:nth-child(n + 7) {
      display: none;
    }
  }

  @media (max-width: 520px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));

    & > *:nth-child(n + 5) {
      display: none;
    }
  }
`;

const FeedItem = styled.a`
  position: relative;
  display: block;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  text-decoration: none;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  
  &:hover img {
    transform: scale(1.04);
  }

  &:hover div {
    opacity: 1;
  }
`;

const FeedImage = styled.img`
  width: 100%;
  height: 100%;
    max-width: 100%;

  object-fit: cover;
  display: block;
  transition: transform 0.25s ease;
`;

const HoverLayer = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.25s ease;
`;

const HoverText = styled.span`
  color: white;
  font-size: 0.95rem;
  font-weight: 500;
`;