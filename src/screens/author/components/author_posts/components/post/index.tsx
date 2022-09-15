/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { Box, Typography, useTheme } from '@mui/material';

const Post = (props: any) => {
  const theme = useTheme();
  const { post, main = false } = props;
  const { featureImage, title, excerpt, publishedAt, slug, author } = post;
  return (
    <Box
      sx={{
        border: '1px solid rgba(195, 204, 226, 0.3)',
        borderRadius: theme.spacing(1.5),
        color: 'primary.main',
        background: 'transparent',
        height: '100%',
        '& a': {
          color: 'primary.main',
          textDecoration: 'none',
        },
        '& img': {
          borderRadius: theme.spacing(1.5, 1.5, 0, 0),
          minHeight: '150px',
          width: '100%',
          objectFit: 'cover',
        },
        [theme.breakpoints.up('laptop')]: {
          gridColumn: main ? '1 / span 2' : 'auto',
        },
      }}
    >
      <Box ref={props.refProp} sx={{ padding: 0 }}>
        <Link href="/blog/[title]" as={`/blog/${slug}`}>
          <a>
            <img
              src={
                featureImage == null
                  ? '/static/images/assets/blog-placeholder.png'
                  : featureImage
              }
              alt={title}
            />
            <Box
              sx={{
                padding: theme.spacing(2.5, 2.5, 0, 2.5),
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  fontSize: theme.spacing(3),
                  paddingBottom: theme.spacing(3),
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 700,
                  fontSize: theme.spacing(2),
                }}
              >
                {excerpt}
              </Typography>
            </Box>
          </a>
        </Link>
        <Box
          sx={{
            padding: theme.spacing(5, 2.5, 2.5, 2.5),
          }}
        >
          <Box
            component="span"
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              flexDirection: 'column',
              color: 'rgba(255, 255, 255, 0.5)',
              fontWeight: 400,
              fontSize: '12px',
              [theme.breakpoints.up('laptop')]: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              },
            }}
          >
            <p>
              Posted by{' '}
              <Link href="/author/[author]" as={`/author/${author.slug}`}>
                <a
                  style={{
                    textDecoration: 'underline',
                    color: 'rgba(255, 255, 255, 0.5)',
                  }}
                >
                  {author.name}
                </a>
              </Link>
            </p>
            <p className="date">{publishedAt}</p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Post;
