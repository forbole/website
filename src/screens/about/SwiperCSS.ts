import styled from '@emotion/styled';

export const YTBSwiperCSS = styled.div`
    .v-next.swiper-button-disabled,
    .v-prev.swiper-button-disabled {
        display: none;
    } 
    .v-next{
        position: absolute; right: 0%; top: 50%; transform: translateY(-50%);
    }
    .v-prev{
        position: absolute; left: 0%; top: 50%; transform: translateY(-50%);
    }
`