import styled from "styled-components";
import { useEffect } from "react";

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
                            ‹
                        </NavButtonLeft>

                        <NavButtonRight onClick={onNext} aria-label="Next image">
                            ›
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
  width: min(100%, 1100px);
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -10px;
  right: -10px;
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 50%;
  background: white;
  color: black;
  font-size: 1.8rem;
  cursor: pointer;
  z-index: 2;
`;
const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 52px;
  height: 52px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: black;
  font-size: 2rem;
  cursor: pointer;
  z-index: 3;
`;
const NavButtonLeft = styled(NavButton)`
  left: 12px;
`;

const NavButtonRight = styled(NavButton)`
  right: 12px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  max-height: 90vh;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const LargeImage = styled.img`
  width: 100%;
  max-height: 90vh;
  object-fit: contain;
  display: block;
`;
const Counter = styled.div`
  position: absolute;
  bottom: -32px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 0.95rem;
`;