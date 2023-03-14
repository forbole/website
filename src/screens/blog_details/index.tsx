/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useWindowDimensions } from '@hooks';
import { Layout, Tags, ScrollToTop, ThemeModeSwitch } from '@components';
import { Author, SocialMedia } from './components';
import { ContentBox, ContentCSS, MobileCSS, LaptopCSS } from './styles';

const BlogDetails = ({ post }: any) => {
  const theme = useTheme();
  const { isDesktop } = useWindowDimensions();
  const topRef = React.useRef(null);
  const { title, tags, excerpt, featureImage } = post;

  return (
    <Layout
      title={post.title}
      description={excerpt}
      type="article"
      image={featureImage}
      twitterImage={featureImage}
      keywords={tags.map((x: { name: any }) => x.name ?? '')}
      navLink="/blog"
      footer
    >
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
            '> img': {
              width: '100%',
              height: '180px',
              objectFit: 'cover',
              [theme.breakpoints.up('tablet')]: {
                height: '200px',
              },
              [theme.breakpoints.up('laptop')]: {
                width: '1200px',
                height: '416px',
              },
            },
          }}
        >
          <img
            src={
              post.featureImage == null
                ? '/images/assets/blog-placeholder.png'
                : post.featureImage
            }
            alt={title}
            width={isDesktop ? '12000px' : '100%'}
            height={isDesktop ? '416px' : '180px'}
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
                paddingBottom: theme.spacing(4),
                fontSize: theme.spacing(3.5),
              }}
            >
              {title}
            </Typography>
            <ContentBox dangerouslySetInnerHTML={{ __html: post.html }} />
          </ContentCSS>
        </Box>
        <Tags tags={tags} />
      </MobileCSS>
      <LaptopCSS>
        <Box
          ref={topRef}
          sx={{
            padding: theme.spacing(15, 0),
            width: '100%',
            maxWidth: '1200px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: theme.spacing(6),
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color:
                  theme.palette.mode === 'dark'
                    ? theme.palette.primary.main
                    : theme.palette.text.primary,
                fontWeight: 600,
                fontSize: theme.spacing(5),
              }}
            >
              {title}
            </Typography>
            <ThemeModeSwitch />
          </Box>
          <Box height="100%">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: theme.spacing(7),
              }}
            >
              <Author post={post} />
              <SocialMedia title={post.title} />
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              paddingBottom={theme.spacing(7)}
            >
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
                  objectFit: 'cover',
                }}
              />
            </Box>
            <ContentCSS theme={theme}>
              <ContentBox dangerouslySetInnerHTML={{ __html: post.html }} />
            </ContentCSS>
            <Box display="flex" justifyContent="center">
              <Box
                sx={{
                  paddingTop: theme.spacing(8),
                  height: tags.length > 50 ? '850px' : '550px',
                  width: '80%',
                }}
              >
                <Tags tags={tags} details noPadding />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'none',
              [theme.breakpoints.up('laptop')]: {
                display: 'flex',
                position: 'absolute',
                left: '50%',
                justifyContent: 'center',
                bottom: tags.length > 50 ? '200px' : '250px',
              },
            }}
          >
            <ScrollToTop topRef={topRef} />
          </Box>
        </Box>
      </LaptopCSS>
    </Layout>
  );
};

export default BlogDetails;
