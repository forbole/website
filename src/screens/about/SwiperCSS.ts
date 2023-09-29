import styled from "@emotion/styled";

export const YTBSwiperCSS = styled.div`
  .v-next.swiper-button-disabled,
  .v-prev.swiper-button-disabled {
    display: none;
  }
  .v-next {
    position: absolute;
    right: 0%;
    top: 50%;
    transform: translateY(-50%);
  }
  .v-prev {
    position: absolute;
    left: 0%;
    top: 50%;
    transform: translateY(-50%);
  }
`;
export const ImgBox = styled.div`
  height: 100%;
  .swiper-style {
    height: 100%;
    padding: 0;
  }
  @media screen and (max-width: 1025px) {
    .swiper-style {
      //padding:0 20px;
    }
  }
`;
