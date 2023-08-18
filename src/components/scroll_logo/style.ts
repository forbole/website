import styled from '@emotion/styled';

export const TransitionCSS = styled.div<any>`
  @keyframes horizontalRightMove {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0);
      }
  }
  @keyframes horizontalMove {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
      }
  }
`;