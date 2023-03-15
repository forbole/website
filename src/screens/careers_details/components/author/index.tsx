/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { Box, Typography, useTheme } from '@mui/material';
import { useHKT } from '@hooks';

interface AuthorProps {
  post: any;
  // eslint-disable-next-line react/require-default-props
  noMargin?: boolean;
}

const Author = ({ post, noMargin }: AuthorProps) => {
  const { primaryAuthor: author, publishedAt } = post;
  const theme = useTheme();
  const time = useHKT(publishedAt);
  return (
    <Box
      sx={{
        display: 'flex',
        alignContent: 'center',
        marginBottom: noMargin ? 0 : theme.spacing(3.5),
      }}
    >
      <img
        src={
          author.profileImage == null
            ? '/static/images/assets/blog-placeholder.png'
            : author.profileImage
        }
        alt={author.name}
        style={{
          borderRadius: '50%',
          width: theme.spacing(5),
          height: theme.spacing(5),
        }}
      />
      <Box
        sx={{
          marginLeft: theme.spacing(2),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Link
          key={post.id}
          href="/author/[author]"
          as={`/author/${author.slug}`}
        >
          <a style={{ textDecoration: 'none' }}>
            <Typography
              variant="body1"
              sx={{
                color:
                  theme.palette.mode === 'dark'
                    ? theme.palette.primary.main
                    : theme.palette.text.primary,
                fontWeight: 600,
                fontSize: theme.spacing(1.75),
              }}
            >
              {author.name}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                opacity: 0.5,
                color:
                  theme.palette.mode === 'dark'
                    ? theme.palette.primary.main
                    : 'rgba(29, 30, 34, 1)',
                fontWeight: 400,
                fontSize: theme.spacing(1.75),
              }}
            >
              {time}
            </Typography>
          </a>
        </Link>
      </Box>
    </Box>
  );
};

export default Author;
