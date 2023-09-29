/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";
import { Box, Typography, useTheme } from "@mui/material";
import { useHKT } from "@hooks";

const Author = ({ post }: any) => {
  const { primaryAuthor: author, publishedAt } = post;
  const theme = useTheme();
  const time = useHKT(publishedAt);
  return (
    <Box
      sx={{
        display: "flex",
        alignContent: "center",
        marginBottom: theme.spacing(3.5),
      }}
    >
      <img
        src={
          author.profileImage == null
            ? "/images/assets/blog-placeholder.png"
            : author.profileImage
        }
        alt={author.name}
        style={{
          borderRadius: "50%",
          width: theme.spacing(5),
          height: theme.spacing(5),
          margin: 0,
        }}
      />
      <Box
        sx={{
          marginLeft: theme.spacing(2),
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Link
          key={post.id}
          href="/author/[author]"
          as={`/author/${author.slug}`}
        >
          <a style={{ textDecoration: "none" }}>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.primary.main,
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
                color: theme.palette.primary.main,
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
