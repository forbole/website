import styled from '@emotion/styled';

export const TNCCSS = styled.div`
  padding: 0px 24px;
  .email {
    list-style: none;
  }
  h1 {
    padding-top: 8px;
    padding-bottom: 24px;
    font-size: 20px;
  }
  h2 {
    padding-bottom: 16px;
    font-size: 18px;
  }
  h3 {
    padding: 16px 0;
    font-size: 16px;
  }
  p {
    padding: 8px 0px;
    font-size: 14px;
  }
  li {
    padding: 8px 0px;
    font-size: 14px;
  }
  a {
    color: white;
  }
  @media only screen and (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding: 14rem 0;
  }
`;
