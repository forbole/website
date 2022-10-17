/* eslint-disable no-unused-vars */
import React from 'react';
import Image from 'next/image';
import DOMPurify from 'isomorphic-dompurify';
import { Box, Card, Divider, Typography, useTheme } from '@mui/material';
import { useWindowDimensions } from '@hooks';
import { LayoutVal, Tags, ScrollToTop, ThemeModeSwitch } from '@components';
// import { Author, SocialMedia } from './components';
import {
  GuideContentBox,
  GuideContentCSS,
  MobileCSS,
  LaptopCSS,
} from './styles';

const GuideDetails = ({ post }: any) => {
  const theme = useTheme();
  const { isDesktop } = useWindowDimensions();
  const topRef = React.useRef(null);
  const url = process.env.NEXT_PUBLIC_URL;
  const {
    title,
    publishedAt,
    modified,
    slug,
    author,
    tags,
    excerpt,
    featureImage,
    html,
  } = post;
  const { sanitize } = DOMPurify;
  const cmsLoader = ({ src, width, quality }: any) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <Box
      sx={{
        maxWidth: '100%',
        margin: 'auto',
        boxShadow: '4px 8px 24px rgba(116, 81, 255, 0.16)',
        borderRadius: 5,
        [theme.breakpoints.up('laptop')]: {
          background: theme.palette.primary.main,
          boxShadow:
            '0px 6px 14px -6px rgba(2, 38, 225, 0.12), 0px 10px 32px -4px rgba(2, 38, 225, 0.1)',
          borderRadius: theme.spacing(3),
          maxWidth: '70%',
        },
      }}
    >
      <Box
        sx={{
          padding: theme.spacing(5, 2),
          [theme.breakpoints.up('laptop')]: {
            padding: theme.spacing(8, 9),
          },
        }}
      >
        <GuideContentCSS theme={theme}>
          <GuideContentBox
            dangerouslySetInnerHTML={{ __html: sanitize(post.html) }}
          />
        </GuideContentCSS>
      </Box>
    </Box>
  );
};

export default GuideDetails;
