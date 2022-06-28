import styled from '@emotion/styled';

export const PolicyCSS = styled.div<any>`
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.2rem;
  @media only screen and (min-width: 1024px) {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
  }
`;

export const TermsCSS = styled.div<any>`
  color: rgba(201, 201, 201, 1);
  display: flex;
  align-items: center;
  height: 1rem;
  .vhr {
    padding: 0 0.2rem;
    height: 100%;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    margin: 0 1rem;
  }
  small {
    &:hover {
      cursor: pointer;
    }
  }
`;
