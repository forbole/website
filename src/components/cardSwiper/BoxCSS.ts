import styled from '@emotion/styled';

export const BoxCSS = styled.div`
  
    .swiper-slide.scale {
        transition: 300ms;
        transform: scale(0.8)!important;
        text-align: center;
        align-self: center;
        flex-shrink:0;
        width:auto;
    }
    .swiper-slide-active.scale {
        transform: scale(1)!important;
    }
    .c-next.swiper-button-disabled,
    .c-prev.swiper-button-disabled {
        display: none;
    }
    .c-next,
    .c-prev {
        display: none;
    }
    @media screen and (max-width: 768px) {
        .c-next,
        .c-prev {
            display: block;
        }
        .swiper-container{
            padding:0 40px;
        }
    }
`