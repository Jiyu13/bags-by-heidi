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


const posts = [
  { id: 1, image: feed1, link: "#", alt: "Customer post 1" },
  { id: 2, image: feed2, link: "#", alt: "Customer post 2" },
  { id: 3, image: feed3, link: "#", alt: "Customer post 3" },
  { id: 4, image: feed4, link: "#", alt: "Customer post 4" },
  { id: 5, image: feed5, link: "#", alt: "Customer post 5" },
  { id: 6, image: feed6, link: "#", alt: "Customer post 6" },
    { id: 7, image: feed7, link: "#", alt: "Customer post 7" },
  { id: 8, image: feed8, link: "#", alt: "Customer post 8" },
  { id: 9, image: feed9, link: "#", alt: "Customer post 9" },
  { id: 10, image: feed10, link: "#", alt: "Customer post 10" },

];


export default function CustomerFeed() {
    // const [visibleCount, setVisibleCount] = useState(10);
    //
    // useEffect(() => {
    //     function updateVisibleCount() {
    //       const width = window.innerWidth;
    //
    //       if (width <= 520) {
    //         setVisibleCount(4);   // 2 x 2
    //       } else if (width <= 868) {
    //         setVisibleCount(6);   // 3 x 2
    //       } else if (width <= 1124) {
    //         setVisibleCount(8);   // 4 x 2
    //       } else {
    //         setVisibleCount(10);  // 5 x 2
    //       }
    //     }
    //
    //     updateVisibleCount();
    //     window.addEventListener("resize", updateVisibleCount);
    //
    //     return () => window.removeEventListener("resize", updateVisibleCount);
    // }, []);
    //
    // const visiblePosts = posts.slice(0, visibleCount);

  const {customerFeedback} = useContext(UserContext)

    return (
        <FeedSection className="feed-section">
            <FeedInner className="feed-inner">
              <FeedHeader className="feed-header">
                <FeedTitle className="feed-title">{customerFeedback?.title}</FeedTitle>
                <FeedDescription className="feed-description">
                  {customerFeedback?.description}
                </FeedDescription>
              </FeedHeader>

              <FeedGrid className="feed-grid">
                {/*{visiblePosts.map((post) => (*/}
                {/*  <FeedItem key={post.id} href={post.link}>*/}
                {/*    <FeedImage src={post.image} alt={post.alt} />*/}
                {/*    <HoverLayer>*/}
                {/*      <HoverText>View</HoverText>*/}
                {/*    </HoverLayer>*/}
                {/*  </FeedItem>*/}
                {/*))}*/}
                  {posts.map((post) => (
                    <FeedItem key={post.id}
                              // href={post.link}
                    >
                      <FeedImage src={post.image} alt={post.alt} />
                      {/*<HoverLayer>*/}
                      {/*  <HoverText>View</HoverText>*/}
                      {/*</HoverLayer>*/}
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
  background: #fff;
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

const FeedItem = styled.div`
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