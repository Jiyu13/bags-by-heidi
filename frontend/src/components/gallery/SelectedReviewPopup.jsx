import styled from "styled-components";
import { Modal, Overlay} from "../bag-detail/PopupEnquiryForm";
import {useEffect} from "react";

export default function SelectedReviewPopup({closeReview, selectedReview}) {

    // Lock background page scroll while popup is open
    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <ModalOverlay
            onClick={closeReview}
            className="review-modal-container"
        >
            <ModalCard
                className="review-modal-card"
                onClick={(e) => e.stopPropagation()}
            >


                <ModalBody className="review-modal-body">
                    <ModalImageColumn className="review-modal-image-column">
                        <ReviewCloseButton type="button" onClick={closeReview} aria-label="Close review popup">
                            ×
                        </ReviewCloseButton>
                        {selectedReview.image ? (
                            <ModalImage
                                src={selectedReview.image}
                                alt={
                                    selectedReview.image_alt ||
                                    selectedReview.customer_name ||
                                    "review image"
                                }
                            />
                        ) : (
                            <ModalImagePlaceholder>No image available</ModalImagePlaceholder>
                        )}
                    </ModalImageColumn>

                    <ModalTextColumn>
                        <ModalReviewerName>
                            {selectedReview.customer_name}
                        </ModalReviewerName>

                        <ModalReviewDate>{selectedReview.review_date}</ModalReviewDate>

                        <ModalReviewText>
                            {selectedReview.comment}
                        </ModalReviewText>
                    </ModalTextColumn>
                </ModalBody>
            </ModalCard>
        </ModalOverlay>
    )
}

const ModalOverlay = styled(Overlay)`
  border-radius: 8px;
`;

const ModalCard = styled(Modal)`
  position: relative;
  max-width: min(1000px, 100%);
  max-height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.22);
  padding: 0;
  
  
`;

const ReviewCloseButton = styled.button`
  position: absolute;
  top: 0.9rem;
  left: 0.9rem;
  z-index: 2;
  border: none;
  background: rgba(255, 255, 255, 0.95);
  width: 40px;
  height: 40px;
  border-radius: 999px;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);

  &:hover {
    transform: scale(1.05);
  }
 `;

const ModalBody = styled.div`
  display: grid;
  grid-template-columns: minmax(280px, 1fr) minmax(320px, 1fr);
  min-height: 480px;
  border-radius: 8px;

  @media (max-width: 634px) {
    grid-template-columns: 1fr;
    max-height: 90vh;
  }
`;

const ModalImageColumn = styled.div`
  background: #f4f4f4;
  position: relative;
  border-radius: 8px;
`;

const ModalImage = styled.img`
  width: 100%;
  height: 100%;
  min-height: 320px;
  display: block;
  object-fit: cover;
  border-radius:  8px 0 0 8px;
  @media (max-width: 634px) {
    min-height: unset;   // ✅ remove forced minimum
    border-radius: 8px 8px 0 0;
  }
`;

const ModalImagePlaceholder = styled.div`
  min-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #777777;
  padding: 2rem;
`;

const ModalTextColumn = styled.div`
  padding: 2rem 2rem 2.25rem;
  display: flex;
  flex-direction: column;
  //justify-content: center;
`;

const ModalReviewerName = styled.h2`
  margin: 0 0 0.5rem;
  font-size: 1.3rem;
  color: #111111;
`;

const ModalReviewDate = styled.div`
  font-size: 0.9rem;
  color: #777777;
  margin-bottom: 1.25rem;
`;

const ModalReviewText = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.8;
  color: #2e2e2e;
  white-space: pre-line;
`;