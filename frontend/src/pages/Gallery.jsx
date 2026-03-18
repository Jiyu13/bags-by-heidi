import {useContext, useMemo, useState} from "react";
import styled from "styled-components";
import {UserContext} from "../user-content/UserContent";
import {PageText, PageTitle, PageTittleContainer} from "./Contact";

export default function Gallery() {
    const {customerFeedback} = useContext(UserContext)

    const [visibleCount, setVisibleCount] = useState(6);
    const reviews = customerFeedback || [];

    const visibleReviews = useMemo(() => {
        return reviews.slice(0, visibleCount);
    }, [reviews, visibleCount]);

    function handleShowMore() {
        setVisibleCount((prev) => prev + 6);
    }

    return (
        <Section className="gallery-section">
            <Inner className="gallery-inner">

                <PageTittleContainer>
                    <PageTitle>Customer Gallery</PageTitle>
                    <PageText>Our bags, your stories. See how our handmade pieces are worn and loved every day.</PageText>
                </PageTittleContainer>

                <ReviewsGrid className="gallery-review-grid">
                    {visibleReviews.map((review) => (
                        <ReviewCard key={review.id} className="gallery-review-card">
                            {review.image && (
                                <ReviewImageWrapper className="gallery-review-image-wrapper">
                                    <ReviewImage
                                        src={review.image}
                                        alt={review.image_alt || review.name || "review image"}
                                    />
                                </ReviewImageWrapper>
                            )}

                            <ReviewContent className="gallery-review-content">
                                <ReviewerTop>
                                    <ReviewerName>{review.customer_name}</ReviewerName>
                                </ReviewerTop>
                                <ReviewDate>{review.review_date}</ReviewDate>


                                <ReviewText>{review.comment}</ReviewText>

                                {/*{review.item_type && (*/}
                                {/*    <MetaRow>*/}
                                {/*        <MetaLabel>Item type:</MetaLabel>*/}
                                {/*        <MetaValue>{review.item_type}</MetaValue>*/}
                                {/*    </MetaRow>*/}
                                {/*)}*/}
                            </ReviewContent>
                        </ReviewCard>
                    ))}
                </ReviewsGrid>

                {visibleCount < reviews.length && (
                    <LoadMoreWrapper>
                        <LoadMoreButton type="button" onClick={handleShowMore}>
                            Show more reviews
                        </LoadMoreButton>
                    </LoadMoreWrapper>
                )}
            </Inner>
        </Section>
    );
}


const Section = styled.section`
  width: 100%;
  //padding: 4rem 0;
  //background: #ffffff;
`;

const Inner = styled.div`
  width: min(1400px, calc(100% - 3rem));
  margin: 0 auto;
`;

const ReviewsGrid = styled.div`
  //display: grid;
  //gap: 0.5rem;
  //grid-template-columns: repeat(5, minmax(0, 1fr));
  column-count: 5;
  column-gap: 0.8rem;

  @media (max-width: 1226px) {
    //gap: 0.5rem;
    //grid-template-columns: repeat(4, minmax(0, 1fr));
    column-count: 4;
    
  }

  @media (max-width: 1030px) {
    //gap: 0.5rem;
    //grid-template-columns: repeat(3, minmax(0, 1fr));
    column-count: 3;
  }
  @media (max-width: 534px) {
    //gap: 0.5rem;
    //grid-template-columns: repeat(2, minmax(0, 1fr));
    column-count: 2;
  }
`;

const ReviewCard = styled.article`
  border: 1.5px solid rgba(143, 143, 143, 0.4);
  border-radius: 8px;
  overflow: hidden;
  background: transparent;
  break-inside: avoid;
  margin-bottom: 0.5rem
`;

const ReviewImageWrapper = styled.div`
  width: 100%;
  //aspect-ratio: 4 / 5;
  background: #f4f4f4;
`;

const ReviewImage = styled.img`
  width: 100%;
  //height: 100%;
  display: block;
  object-fit: cover;
`;

const ReviewContent = styled.div`
  padding: 1rem 1rem 1.15rem;
`;

const ReviewerTop = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-bottom: 0.35rem;
`;

const ReviewerName = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: bold;
  color: #111111;
`;
const ReviewDate = styled.div`
  font-size: 0.75rem;
  color: #777777;
  margin-bottom: 0.75rem;
`;


const ReviewText = styled.p`
  margin: 0 0 1rem;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #2e2e2e;
`;

const LoadMoreWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const LoadMoreButton = styled.button`
  border: 1px solid #d8d8d8;
  background: #ffffff;
  color: #111111;
  padding: 0.9rem 1.35rem;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #f8f8f8;
  }
`;
// =========================================================================================
const StarsInline = styled.div`
  display: flex;
  gap: 2px;
  margin-bottom: 0.85rem;
`;

const Star = styled.span`
  font-size: 1rem;
  line-height: 1;
  color: ${({ $filled }) => ($filled ? "#111111" : "#d5d5d5")};
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 2.5rem;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const HeaderLeft = styled.div`
  flex: 1;
  max-width: 760px;
`;

const HeaderRight = styled.div`
  flex-shrink: 0;
`;

const SummaryRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;

const StarsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const StarText = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #111111;
`;

const ReviewCount = styled.div`
  font-size: 1rem;
  color: #555555;
`;

const DistributionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

const DistributionRow = styled.div`
  display: grid;
  grid-template-columns: 70px minmax(0, 1fr) 72px;
  align-items: center;
  gap: 0.85rem;
`;

const DistributionLabel = styled.div`
  font-size: 0.95rem;
  color: #333333;
`;

const DistributionCount = styled.div`
  font-size: 0.95rem;
  color: #666666;
  text-align: right;
`;

const ProgressTrack = styled.div`
  width: 100%;
  height: 10px;
  background: #e9e9e9;
  border-radius: 999px;
  overflow: hidden;
`;

const ProgressValue = styled.div`
  height: 100%;
  background: #111111;
  border-radius: 999px;
`;

const WriteReviewButton = styled.button`
  border: none;
  background: #111111;
  color: #ffffff;
  padding: 0.95rem 1.4rem;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    opacity: 0.92;
  }
`;

const MetaRow = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  font-size: 0.88rem;
`;

const MetaLabel = styled.span`
  color: #777777;
`;

const MetaValue = styled.span`
  color: #111111;
  font-weight: 600;
`;
const VerifiedBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.78rem;
  color: #4d4d4d;
  background: #f3f3f3;
  padding: 0.22rem 0.55rem;
  border-radius: 999px;
`;

const VerifiedDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #1a8f5c;
  display: inline-block;
`;

