import styled from "@emotion/styled";

export const TransitionCSS = styled.div<any>`
  @keyframes horizontalRightMove {
    0% {
      transform: translateX(calc(-100% + 100vw));
    }
    100% {
      transform: translateX(0);
    }
  }
  @keyframes horizontalMove0 {
    0% {
      transform: translateX(20vw);
    }
    100% {
      transform: translateX(calc(-100% + 100vw));
    }
  }
  @keyframes horizontalMove2 {
    0% {
      transform: translateX(25vw);
    }
    100% {
      transform: translateX(calc(-100% + 100vw));
    }
  }
  @keyframes horizontalMove3 {
    0% {
      transform: translateX(30vw);
    }
    100% {
      transform: translateX(calc(-100% + 100vw));
    }
  }
`;
