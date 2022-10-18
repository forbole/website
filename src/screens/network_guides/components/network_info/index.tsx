/* eslint-disable no-unused-vars */
import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import DOMPurify from 'isomorphic-dompurify';
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Snackbar,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { CopyIcon } from '@icons';
import { getNetworkInfo } from '@src/utils/network_info';
import { getMiddleEllipsis } from '@utils/get_middle_ellipsis';
import { LayoutVal, Tags, ScrollToTop, ThemeModeSwitch } from '@components';
import { ContentCSS, ContentBox } from './styles';
// import { Author, SocialMedia } from './components';
// import {
//   GuideContentBox,
//   GuideContentCSS,
//   MobileCSS,
//   LaptopCSS,
// } from './styles';

const NetworkInfo = ({ post }: any) => {
  const theme = useTheme();
  const { t } = useTranslation('staking');
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
  const [readMore, setReadMore] = React.useState(false);
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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      sx={{
        padding: theme.spacing(5, 3),
      }}
    >
      <Box
        sx={{
          [theme.breakpoints.up('laptop')]: {
            maxWidth: '1200px',
          },
        }}
      >
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
          <CardContent
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              paddingTop: 0,
              marginTop: theme.spacing(-7),
            }}
          >
            <Box
              sx={{
                '> span': {
                  borderRadius: '50%',
                  border: '8px solid #FFFFFF !important' as any,
                },
              }}
            >
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
            <Box pl={onlyLargeScreen ? 2 : 1}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 600,
                  fontSize: theme.spacing(2),
                  paddingBottom: theme.spacing(1),
                }}
              >
                {networkData.name}
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                flexDirection="row"
                mt={-1}
              >
                <Typography color="#76819B" variant="body2" className="value">
                  {!onlyLargeScreen
                    ? getMiddleEllipsis(networkData.address, {
                        beginning: 15,
                        ending: 5,
                      })
                    : networkData.address}
                </Typography>
                <IconButton onClick={copyText}>
                  <CopyIcon />
                </IconButton>
              </Box>
            </Box>
          </CardContent>
          <CardContent>
            {!readMore && !onlyLargeScreen ? (
              <Box
              // display="flex"
              // justifyContent="center"
              // alignItems="center"
              // flexDirection="column"
              >
                <Typography
                  color={theme.palette.custom.forbole.blue}
                  variant="body2"
                  className="value"
                  sx={{ display: 'contents' }}
                >
                  {excerpt}
                </Typography>
                <Button
                  sx={{ color: '#007FFF', display: 'inline-block', padding: 0 }}
                  onClick={() => setReadMore((prevCheck) => !prevCheck)}
                >
                  More
                </Button>
              </Box>
            ) : (
              <ContentCSS theme={theme}>
                <ContentBox
                  dangerouslySetInnerHTML={{ __html: sanitize(post.html) }}
                />
              </ContentCSS>
            )}
          </CardContent>
        </Card>
      </Box>
      <Snackbar
        open={isCopySuccess}
        autoHideDuration={5000}
        onClose={() => setIsCopySuccess(false)}
        sx={{ justifyContent: 'center' }}
      >
        <Alert onClose={() => setIsCopySuccess(false)} severity="success">
          {t('copied to clipboard')}
        </Alert>
      </Snackbar>
    </Box>
  );
};
export default NetworkInfo;
