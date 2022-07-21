import styled from '@emotion/styled';

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
