/* eslint-disable no-unused-vars */
import React from 'react';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import DOMPurify from 'isomorphic-dompurify';
import { Box, Button, Divider, Typography, useTheme } from '@mui/material';
import { Layout, Tags, ScrollToTop, ThemeModeSwitch } from '@components';
import { useWindowDimensions } from '@hooks';
import { ClientOnly } from '@src/utils/clientOnly';
import { Author, SocialMedia } from './components';
import {
  ButtonCSS,
  ContentBox,
  ContentCSS,
  MobileCSS,
  LaptopCSS,
} from './styles';
import { ApplyDialog } from '../careers/components/opportunities/components';

const CareersDetails = ({ post }: any) => {
  const theme = useTheme();
  const topRef = React.useRef(null);
  const { isDesktop } = useWindowDimensions();
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
  const { t } = useTranslation('careers');
  const { sanitize } = DOMPurify;
  const [applyDialogOpen, setApplyDialogOpen] = React.useState({
    open: false,
    title,
  });
  const cmsLoader = ({ src, width, quality }: any) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <Layout
      title={post.title}
      description={excerpt}
      type="article"
      image={featureImage}
      twitterImage={featureImage}
      keywords={tags.map((x: { name: any }) => x.name ?? '')}
      navLink="/careers"
      footer
    >
      <Box ref={topRef}>
        <MobileCSS>
          <Box
            sx={{
              padding: theme.spacing(12, 3, 0, 3),
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                paddingBottom: theme.spacing(3),
              }}
            >
              <ThemeModeSwitch />
            </Box>
          </Box>
          <Box
            height={isDesktop ? '416px' : '180px'}
            sx={{
              '> span': {
                width: '100%!important' as any,
              },
            }}
          >
            <Image
              loader={cmsLoader}
              src={
                post.featureImage == null
                  ? '/static/images/assets/blog-placeholder.png'
                  : post.featureImage
              }
              alt={title}
              width={isDesktop ? '12000px' : '100%'}
              height={isDesktop ? '416px' : '180px'}
              quality={100}
              objectFit="cover"
            />
          </Box>
          <Box sx={{ padding: theme.spacing(3) }}>
            <ContentCSS theme={theme}>
              <Author post={post} />
              <SocialMedia title={post.title} />
              <Typography
                variant="h3"
                sx={{
                  color:
                    theme.palette.mode === 'dark'
                      ? theme.palette.primary.main
                      : theme.palette.text.primary,
                  fontWeight: 600,
                  fontSize: theme.spacing(2.5),
                }}
              >
                {title}
              </Typography>
              <Divider
                variant="middle"
                sx={{
                  border:
                    theme.palette.mode === 'dark'
                      ? '1px solid rgba(255, 255, 255, 0.3)'
                      : '1px solid rgba(29, 30, 34, 0.3)',
                  margin: theme.spacing(4.375, 0, 4.375, 0),
                }}
              />
              <ContentBox
                dangerouslySetInnerHTML={{ __html: sanitize(post.html) }}
              />
            </ContentCSS>
          </Box>
          <Box
            position="fixed"
            right="5%"
            bottom="10%"
            sx={{
              display: 'block',
              [theme.breakpoints.up('laptop')]: {
                display: 'none',
              },
            }}
          >
            <ScrollToTop topRef={topRef} mobile />
          </Box>
        </MobileCSS>
        <LaptopCSS>
          <Box
            sx={{
              [theme.breakpoints.up('laptop')]: {
                background:
                  theme.palette.mode === 'dark'
                    ? 'url(/images/assets/image_BG.png) top'
                    : '#FFFFFF',
                backgroundPosition: '0 0',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100%',
                width: '100%',
              },
            }}
          >
            <Box
              pt={isDesktop ? theme.spacing(20) : 0}
              sx={{ maxWidth: '1200px', margin: 'auto' }}
            >
              <Typography
                variant="h1"
                sx={{
                  display: 'none',
                  [theme.breakpoints.up('laptop')]: {
                    display: 'block',
                    color:
                      theme.palette.mode === 'dark'
                        ? 'primary.main'
                        : '#000000',
                    fontSize: theme.spacing(4),
                    fontWeight: 600,
                    textAlign: 'center',
                  },
                }}
              >
                {title}
              </Typography>
            </Box>
            <Box
              sx={{
                [theme.breakpoints.up('laptop')]: {
                  background:
                    theme.palette.mode === 'dark'
                      ? 'url(/images/assets/image_waveBG.png)'
                      : '#FFFFFF',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '150%',
                  backgroundPosition: 'top 0px left -150px',
                  minHeight: '75vh',
                  width: '100%',
                  zIndex: 1,
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop:
                    theme.palette.mode === 'dark'
                      ? theme.spacing(28)
                      : theme.spacing(15),
                }}
              >
                <Box sx={{ maxWidth: '1200px' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingBottom: theme.spacing(7),
                    }}
                  >
                    <Author post={post} noMargin />
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box sx={{ margin: theme.spacing(0, 2, 3, 0) }}>
                        <ThemeModeSwitch />
                      </Box>
                      <SocialMedia title={post.title} noPadding />
                    </Box>
                  </Box>
                  <Box display="flex" justifyContent="center">
                    <img
                      src={
                        post.featureImage == null
                          ? '/static/images/assets/blog-placeholder.png'
                          : post.featureImage
                      }
                      alt={title}
                      style={{
                        width: '80%',
                        height: 'auto',
                      }}
                    />
                  </Box>
                  <ContentCSS theme={theme}>
                    <ContentBox
                      dangerouslySetInnerHTML={{ __html: sanitize(post.html) }}
                    />
                  </ContentCSS>
                  <ClientOnly>
                    <Box
                      sx={{
                        [theme.breakpoints.up('laptop')]: {
                          height: '500px',
                          paddingTop: theme.spacing(6),
                        },
                      }}
                    >
                      <ButtonCSS>
                        <Button
                          onClick={() =>
                            setApplyDialogOpen({ open: true, title })
                          }
                        >
                          {t('apply now')}
                        </Button>
                      </ButtonCSS>
                    </Box>
                    <ApplyDialog
                      setting={applyDialogOpen}
                      onClose={() => setApplyDialogOpen({ open: false, title })}
                    />
                  </ClientOnly>
                  <Box
                    sx={{
                      display: 'none',
                      [theme.breakpoints.up('laptop')]: {
                        display: 'flex',
                        position: 'absolute',
                        left: '48.5%',
                        justifyContent: 'center',
                        bottom: '250px',
                      },
                    }}
                  >
                    <ScrollToTop topRef={topRef} />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </LaptopCSS>
        <ClientOnly>
          <Box
            sx={{
              display: 'block',
              [theme.breakpoints.up('laptop')]: {
                display: 'none',
              },
            }}
          >
            <ButtonCSS>
              <Button
                // sx={styles.button}
                onClick={() => setApplyDialogOpen({ open: true, title })}
              >
                {t('apply now')}
              </Button>
            </ButtonCSS>
          </Box>
          <ApplyDialog
            setting={applyDialogOpen}
            onClose={() => setApplyDialogOpen({ open: false, title })}
          />
        </ClientOnly>
      </Box>
    </Layout>
  );
};

export default CareersDetails;
