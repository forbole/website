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
  CardContent,
  CardMedia,
  IconButton,
  Snackbar,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { CopyIcon } from '@icons';
import { getNetworkInfo } from '@src/utils/network_info';
import { getMiddleEllipsis } from '@utils/get_middle_ellipsis';
import { ContentCSS, ContentBox } from './styles';
import { InfoCard } from './components';
import { useNetworkGuidesHook } from './hooks';

const NetworkInfo = ({ post }: any) => {
  const theme = useTheme();
  const { t } = useTranslation('staking');
  const { title, tags, excerpt, featureImage } = post;
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up('laptop'));
  const [isCopySuccess, setIsCopySuccess] = React.useState(false);
  const [readMore, setReadMore] = React.useState(false);
  const { sanitize } = DOMPurify;
  const cmsLoader = ({ src, width, quality }: any) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };
  const networkData =
    // eslint-disable-next-line no-nested-ternary
    tags.length <= 1
      ? null
      : tags[1].slug === 'crypto-org'
      ? getNetworkInfo('crypto.org')
      : getNetworkInfo(tags[1].slug);

  const { cosmosNetworkGuides } = useNetworkGuidesHook();

  const networkStats = cosmosNetworkGuides[networkData.graphql];

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
  const coverImage = networkData
    ? `/images/guides/how_to_stake_${networkData.graphql}.png`
    : featureImage;

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
            image={coverImage || featureImage}
            alt="network feature image"
            sx={{
              objectFit: 'cover',
              objectPosition: '0% 37%',
            }}
          />
          <CardContent
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              paddingTop: 0,
              marginTop: theme.spacing(-5),
              [theme.breakpoints.up('laptop')]: {
                justifyContent: 'space-between',
                marginTop: theme.spacing(-7),
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
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
                      ? '/images/assets/blog-placeholder.png'
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
                {networkData.address && (
                  <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="row"
                    mt={-1}
                  >
                    <Typography
                      color="#76819B"
                      variant="body2"
                      className="value"
                    >
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
                )}
              </Box>
            </Box>
            <Box>
              <Button
                variant="contained"
                href={networkData.delegate ? networkData.delegate : ''}
                disabled={!networkData.delegate}
                sx={{
                  display: 'none',
                  width: '97px',
                  height: '32px',
                  lineHeight: '17px',
                  fontWeight: 600,
                  padding: 0,
                  background:
                    'linear-gradient(286.17deg, #D431EE 0%, #FF426B 100%)',
                  borderRadius: theme.spacing(3),
                  color: 'primary.main',
                  boxShadow: 'none',
                  [theme.breakpoints.up('laptop')]: {
                    width: '111px',
                    height: '45px',
                    display: 'inline-flex',
                  },
                }}
              >
                Stake Now
              </Button>
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
              {!onlyLargeScreen ? (
                <Box textAlign="center" sx={{ padding: theme.spacing(0, 2) }}>
                  {readMore ? (
                    <ContentCSS theme={theme}>
                      <ContentBox
                        dangerouslySetInnerHTML={{
                          __html: sanitize(post.html),
                        }}
                      />
                    </ContentCSS>
                  ) : (
                    <>
                      <Typography
                        color={theme.palette.custom.forbole.blue}
                        variant="body2"
                        className="value"
                        sx={{
                          display: 'contents',
                          textAlign: 'center',
                          // WebkitLineClamp: readMore ? 10 : 5,
                          WebkitLineClamp: readMore ? 'unset' : 'inherit',
                        }}
                      >
                        {excerpt}
                      </Typography>
                      <Button
                        sx={{
                          color: '#007FFF',
                          display: readMore ? 'none' : 'inline-block',
                          padding: 0,
                        }}
                        onClick={() => setReadMore((prevCheck) => !prevCheck)}
                      >
                        {t('more')}
                      </Button>
                    </>
                  )}
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
                  width: '100%',
                  [theme.breakpoints.up('laptop')]: {
                    gridTemplateRows: 'repeat(2, 1fr)',
                    gridTemplateColumns: '1fr 1fr',
                    paddingTop: 0,
                    width: '50%',
                  },
                }}
              >
                {networkStats.map((info, i) => (
                  <InfoCard
                    key={i}
                    info={networkData.key}
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
