// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import React from 'react';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import 'swiper/swiper.min.css';
import SwiperCore, { Navigation } from 'swiper';
// 挂载到当前swiper实例
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Arraw, { Direction } from '../arrow';
import { BoxCSS } from './BoxCSS';
import useTranslation from 'next-translate/useTranslation';

SwiperCore.use([Navigation]);

type PersonInfo = {
  name: string;
  position: string;
  desc: string;
  img: string;
};

const PersonCard = ({ desc, name, position, img }: PersonInfo) => {
  return (
    <Card
      sx={{
        display: "flex",
        gap:'20px',
        boxSizing: "border-box",
        height: "100%",
        minHeight:"368px",
        padding: "32px 24px",
        flexDirection: "column",
        alignItems: "flex-start",
        borderRadius: '24px',
        background: 'linear-gradient(179deg, #FFF 0%, rgba(255, 255, 255, 0.89) 34.90%, #FFF 100%)',
        boxShadow:
          "0px 10px 32px -4px rgba(96, 60, 238, 0.20), 0px 6px 14px -6px rgba(96, 60, 238, 0.28)",
      }}
    >
      {img && <Avatar
        alt='Phoebe Poon'
        src={img}
        sx={{
          width: 100,
          height: 100,
          boxShadow:
            '0px 10px 32px -4px rgba(96, 60, 238, 0.50), 0px 6px 14px -6px rgba(96, 60, 238, 0.28)'
        }}
      />}
      <Box>
      {/* 姓名 */}
      <Typography
        sx={{
          fontSize: {mobile:24,laptop:20},
          fontStyle: "normal",
          fontWeight: 700,
          lineHeight: "normal",
          letterSpacing: 0.036,
          color: "#202A43",
        }}
      >
        {name}
      </Typography>

      {/* 职位 */}
      <Typography
        sx={{
          fontSize:  {mobile:18,laptop:16},
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "normal",
          letterSpacing: -0.36,
          color: "#202A43",
        }}
      >
        {position}
      </Typography>
      </Box>
      {/* 描述 */}
      <Typography
        sx={{
          width: "100%",
          fontSize: {mobile:14,laptop:16},
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: {mobile:'20px',laptop:'22px'},
          letterSpacing: {mobile:'-0.112px',laptop:'-0.192px'},
          color: "#2A1A6A",
        }}
      >
        {desc}
      </Typography>
    </Card>
  );
};
type CarouselProps = {
  personList?: PersonInfo[];
};
const Carousel = ({ personList }: CarouselProps) => {
  const theme = useTheme();
  const {t} =useTranslation("common")
  
  if (!personList) {
    personList = [
        {
          name: t('coming_soon'),
          position: "",
          desc: ``,
          img: "",
        },{
          name: t('coming_soon'),
          position: "",
          desc: ``,
          img: "",
        },{
          name: t('coming_soon'),
          position: "",
          desc: ``,
          img: "",
        },
    ]
  //   if (onlyLargeScreen) {
  //     personList = [
  //       {
  //         name: "Michael McCaffrey",
  //         position: "Lead Business Developer, Coreum",
  //         desc: `Forbole is an exceptional SaaS provider that offers valuable solutions, especially within the Cosmos
  //       ecosystem. Their expertise and commitment to delivering high-quality services have greatly benefited the
  //       Coreum blockchain. Their team has been responsive, knowledgeable, and efficient in addressing our
  //       needs and ensuring a seamless experience. I highly recommend Forbole to anyone seeking reliable and
  //       innovative SaaS solutions.`,
  //         img: "/icons/Michael McCaffrey-Coreum.png",
  //       },
  //       {
  //         name: "Boz Menzalji",
  //         position: "COO of Overclock Labs, creator of Akash Network",
  //         desc: `Forbole's team has been a reliable partner from the earliest days for Akash Network, allowing us to tap
  //       into deep know-how for testnets, mainnet upgrades, and more. The tools they have contributed to the
  //       ecosystem, such as Big Dipper's Explorer, has been a great value-add to our growing ecosystem. We are
  //       fortunate to have a great partner with Forbole.`,
  //         img: "/icons/person_avatar.png",
  //       },
  //       {
  //         name: "Calin Pasat",
  //         position: "Node Foundation Director, Humans.ai",
  //         desc: `Working with Forbole has been an enlightening experience. As validators, they are reliably efficient, but
  //       it's their commitment to contributing to the broader ecosystem that truly sets them apart with open-source
  //       tools like Big Dipper Explorer. Their forward-thinking nature is evident in their proactive involvement in
  //       various projects, reflecting a deep understanding and a promising vision for the blockchain industry.`,
  //         img: "/icons/Calin Pasat-humansai.png",
  //       },
  //     ];
  //   } else {
  //     personList = [
  //       {
  //         name: "Boz Menzalji",
  //         position: "COO of Overclock Labs, creator of Akash Network",
  //         desc: `Forbole's team has been a reliable partner from the earliest days for Akash Network, allowing us to tap
  //         into deep know-how for testnets, mainnet upgrades, and more. The tools they have contributed to the
  //         ecosystem, such as Big Dipper's Explorer, has been a great value-add to our growing ecosystem. We are
  //         fortunate to have a great partner with Forbole.`,
  //         img: "/icons/person_avatar.png",
  //       },
  //       {
  //         name: "Michael McCaffrey",
  //         position: "Lead Business Developer, Coreum",
  //         desc: `Forbole is an exceptional SaaS provider that offers valuable solutions, especially within the Cosmos
  //         ecosystem. Their expertise and commitment to delivering high-quality services have greatly benefited the
  //         Coreum blockchain. Their team has been responsive, knowledgeable, and efficient in addressing our
  //         needs and ensuring a seamless experience. I highly recommend Forbole to anyone seeking reliable and
  //         innovative SaaS solutions.`,
  //         img: "/icons/Michael McCaffrey-Coreum.png",
  //       },
  //       {
  //         name: "Calin Pasat",
  //         position: "Node Foundation Director, Humans.ai",
  //         desc: `Working with Forbole has been an enlightening experience. As validators, they are reliably efficient, but
  //         it's their commitment to contributing to the broader ecosystem that truly sets them apart with open-source
  //         tools like Big Dipper Explorer. Their forward-thinking nature is evident in their proactive involvement in
  //         various projects, reflecting a deep understanding and a promising vision for the blockchain industry.`,
  //         img: "/icons/Calin Pasat-humansai.png",
  //       },
  //     ];
  //   }
  }

  return (
    <BoxCSS>
      <Box
        position={"relative"}
        sx={{
          [theme.breakpoints.down("laptop")]: {
            margin: "0 -16px",
          },
        }}
      >
        <Swiper
          className="swiper-no-swiping"
          spaceBetween={-16}
          slidesPerView={3}
          centeredSlides={true}
          initialSlide={1}
          navigation={{
            nextEl: ".c-next",
            prevEl: ".c-prev",
          }}
          breakpoints={{
            375: {
              slidesPerView: 1,
              initialSlide: 0,
              spaceBetween:-16
            },
            1025: {
              spaceBetween: -16,
              slidesPerView: 3,
              initialSlide: 1,
            },
          }}
        >
          {personList.map((item, index) => (
            <SwiperSlide  key={index}>
              <PersonCard
                name={item.name}
                position={item.position}
                desc={item.desc}
                img={item.img}
                key={index}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Arraw
          className="c-next"
          direction={Direction.Right}
          sx={{
            position: "absolute",
            right: "0",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
        <Arraw
          className="c-prev"
          direction={Direction.Left}
          sx={{
            position: "absolute",
            left: "0",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
      </Box>
    </BoxCSS>
  );
};

export default Carousel;
