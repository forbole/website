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
import { InfoCard } from './components';
import { infoItems } from './config';

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
        padding: theme.spacing(15, 3),
        [theme.breakpoints.up('laptop')]: {
          padding: theme.spacing(0, 3),
        },
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
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                [theme.breakpoints.up('laptop')]: {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                },
              }}
            >
              {!readMore && !onlyLargeScreen ? (
                <Box textAlign="center" sx={{ padding: theme.spacing(0, 2) }}>
                  <Typography
                    color={theme.palette.custom.forbole.blue}
                    variant="body2"
                    className="value"
                    sx={{
                      display: 'contents',
                      textAlign: 'center',
                    }}
                  >
                    {excerpt}
                  </Typography>
                  <Button
                    sx={{
                      color: '#007FFF',
                      display: 'inline-block',
                      padding: 0,
                    }}
                    onClick={() => setReadMore((prevCheck) => !prevCheck)}
                  >
                    {t('more')}
                  </Button>
                </Box>
              ) : (
                <ContentCSS theme={theme}>
                  <ContentBox
                    dangerouslySetInnerHTML={{ __html: sanitize(post.html) }}
                  />
                </ContentCSS>
              )}
              <Box
                sx={{
                  display: 'grid',
                  padding: '12px 8px',
                  gridGap: theme.spacing(2),
                  gridTemplateColumns: 'repeat(1, 1fr)',
                  paddingTop: theme.spacing(3),
                  [theme.breakpoints.up('laptop')]: {
                    gridTemplateRows: 'repeat(2, 1fr)',
                    gridTemplateColumns: '1fr 1fr',
                    paddingTop: 0,
                  },
                }}
              >
                {infoItems.map((info) => (
                  <InfoCard
                    title={info.title}
                    stats={info.stats}
                    type={info.type}
                  />
                ))}
              </Box>
            </Box>
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
