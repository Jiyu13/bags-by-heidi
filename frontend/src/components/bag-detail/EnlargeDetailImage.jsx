import styled from "styled-components";
import { useEffect } from "react";
import left_icon from "../../assets/icons/left.svg"
import right_icon from "../../assets/icons/right.svg"


export default function EnlargeDetailImage({
    images,
    currentIndex,
    isOpen,
    onClose,
    onPrev,
    onNext,
}) {
    useEffect(() => {
        if (!isOpen) return;

        function handleKeyDown(e) {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") onPrev();
            if (e.key === "ArrowRight") onNext();
        }

        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "auto";
        };
    }, [isOpen, onClose, onPrev, onNext]);

    if (!isOpen || currentIndex === null || !images?.length) return null;

    const currentImage = images[currentIndex];
    if (!currentImage) return null;

    return (
        <Overlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose} aria-label="Close image preview">
                    ×
                </CloseButton>

                {images?.length > 1 && (
                    <>
                        <NavButtonLeft onClick={onPrev} aria-label="Previous image">
                            <NavImg src={left_icon} alt="Previous button"/>
                        </NavButtonLeft>

                        <NavButtonRight onClick={onNext} aria-label="Next image">
                            <NavImg src={right_icon} alt="Next button"/>
                        </NavButtonRight>
                    </>
                )}


                <ImageWrapper>
                    <LargeImage
                        src={currentImage?.src}
                        alt={currentImage?.alt || "enlarged product image"}
                    />
                </ImageWrapper>
                {images?.length > 1 && (
                    <Counter>
                        {currentIndex + 1} / {images?.length}
                    </Counter>
                )}
            </ModalContent>
        </Overlay>
    );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.72);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1rem;
`;

const ModalContent = styled.div`
  position: relative;
  display: inline-flex;
  max-width: calc(100vw - 2rem);
  max-height: calc(100vh - 2rem);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 3rem;
  height: 3rem;
  border: none;
  border-radius: 50%;
  background: white;
  color: black;
  font-size: 1.8rem;
  cursor: pointer;
  z-index: 4;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 3rem;
  height: 3rem;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: black;
  cursor: pointer;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NavButtonLeft = styled(NavButton)`
  left: 12px;
`;

const NavButtonRight = styled(NavButton)`
  right: 12px;
`;
const NavImg = styled.img`
  background: none;
  width: 24px;
`

const ImageWrapper = styled.div`
  display: inline-flex;
  max-width: calc(100vw - 2rem);
  max-height: calc(100vh - 2rem);
  overflow: hidden;
`;

const LargeImage = styled.img`
  display: block;
  max-width: calc(100vw - 2rem);
  max-height: calc(100vh - 2rem);
  width: auto;
  height: auto;
  object-fit: contain;
`;
const Counter = styled.div`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  background: rgba(0, 0, 0, 0.55);
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-size: 0.95rem;
`;

