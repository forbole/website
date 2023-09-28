import styled from "@emotion/styled";

export const TransitionCSS = styled.div<any>`
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  animation: fadeIn 10s;
`;
export const FilterBG = styled.div<any>`
  position: absolute;
  inset: 0 16px;
  opacity: 0.8;
  background: #fd3317;
  filter: blur(40px);
  z-index: -1;
`;
