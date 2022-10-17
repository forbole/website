/* eslint-disable no-unused-vars */
import React from 'react';
import Image from 'next/image';
import DOMPurify from 'isomorphic-dompurify';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { getNetworkInfo } from '@src/utils/network_info';
import { LayoutVal, Tags, ScrollToTop, ThemeModeSwitch } from '@components';
// import { Author, SocialMedia } from './components';
// import {
//   GuideContentBox,
//   GuideContentCSS,
//   MobileCSS,
//   LaptopCSS,
// } from './styles';

const NetworkInfo = ({ post }: any) => {
  const theme = useTheme();
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
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up('laptop'));
  const [isCopySuccess, setIsCopySuccess] = React.useState(false);
  const { sanitize } = DOMPurify;
  const cmsLoader = ({ src, width, quality }: any) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };
  const networkData = tags.length <= 1 ? null : getNetworkInfo(tags[1].slug);

  const copyText = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      navigator.clipboard.writeText(
        networkData ? networkData.address : 'coming soon'
      );
      setIsCopySuccess(true);
    },
    [networkData?.address]
  );
  const networkImage =
    tags.length <= 1 ? null : `/images/network/${tags[1].slug}.png`;
  return (
    <Card
      sx={{
        background: theme.palette.common.white,
        /* Shadow/Secondary (Validator)/Drop Shadow 01 */
        boxShadow:
          '0px 8px 22px -6px rgba(2, 38, 225, 0.12), 0px 14px 64px -4px rgba(2, 38, 225, 0.12)',
        borderRadius: 2,
      }}
    >
      <CardMedia
        component="img"
        height={onlyLargeScreen ? 240 : 106}
        image={featureImage}
        alt="network feature image"
      />
      <CardContent>
        <Box>
          <Image
            loader={cmsLoader}
            src={
              networkData.image == null
                ? '/static/images/assets/blog-placeholder.png'
                : networkData.image
            }
            alt={title}
            width={onlyLargeScreen ? '90px' : '52px'}
            height={onlyLargeScreen ? '90px' : '52px'}
            quality={100}
            objectFit="contain"
          />
        </Box>
      </CardContent>
    </Card>
  );
};
export default NetworkInfo;
