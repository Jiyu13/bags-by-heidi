import styled from "styled-components";


export const BannerSkeleton = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;

  background: linear-gradient(
    90deg,
    #eeeeee 25%,
    #f5f5f5 37%,
    #eeeeee 63%
  );

  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;

  @keyframes shimmer {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: -100% 0;
    }
  }
`;