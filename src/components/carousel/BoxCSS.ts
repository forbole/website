import styled from "@emotion/styled";

export const BoxCSS = styled.div`
  .swiper-container {
    padding: 40px;
  }
  .swiper-wrapper {
    align-items: stretch;
  }
  .swiper-slide {
    transition: 300ms;
    transform: scale(0.8) !important;
    height: auto;
    width: 100%;
  }

  .swiper-slide-active {
    transform: scale(1) !important;
  }
  .c-next.swiper-button-disabled,
  .c-prev.swiper-button-disabled {
    display: none;
  }

  .c-next,
  .c-prev {
    display: none;
  }

  @media screen and (max-width: 1025px) {
    .c-next,
    .c-prev {
      display: block;
    }
    .swiper-container {
      padding: 30px 32px;
    }
    .swiper-wrapper {
      align-items: flex-start;
    }
  }
`;
