import { Box, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import { NoSSR } from "@src/components/no-ssr";
import useHKT from "@src/hooks/useHKT";

const Author = ({ post }: any) => {
  const { primaryAuthor: author, publishedAt } = post;
  const theme = useTheme();
  const time = useHKT(publishedAt);

  return (
    <Box
      sx={{
        "display": "flex",
        "alignContent": "center",
        "marginBottom": theme.spacing(3.5),
        "& img": {
          height: 40,
          width: 40,
        },
      }}
    >
      <Image
        alt={author.name}
        height={40}
        src={(() => {
          if (author.profileImage == null) {
            return "/images/assets/blog-placeholder.png";
          }

          return `https:${author.profileImage
            .replace("https:", "")
            .replace("http:", "")}`;
        })()}
        style={{
          borderRadius: "50%",
          height: 40,
          margin: 0,
          objectFit: "cover",
          width: 40,
        }}
        width={40}
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
          as={`/author/${author.slug}`}
          href="/author/[author]"
          key={post.id}
          style={{ textDecoration: "none" }}
        >
          <Typography
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 600,
              fontSize: theme.spacing(1.75),
            }}
            variant="body1"
          >
            {author.name}
          </Typography>
          <NoSSR>
            <Typography
              sx={{
                opacity: 0.5,
                color: theme.palette.primary.main,
                fontWeight: 400,
                fontSize: theme.spacing(1.75),
              }}
              variant="body1"
            >
              {time}
            </Typography>
          </NoSSR>
        </Link>
      </Box>
    </Box>
  );
};

export default Author;
