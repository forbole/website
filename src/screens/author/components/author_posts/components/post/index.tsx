/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";
import Image from "next/image";
import { Box, Typography, useTheme } from "@mui/material";
import { useWindowDimensions, useHKT } from "@hooks";

const Post = (props: any) => {
  const theme = useTheme();
  const { isDesktop, isMobile } = useWindowDimensions();
  const { post, main = false } = props;
  const { featureImage, title, excerpt, publishedAt, slug, author } = post;
  const cmsLoader = ({ src, width, quality }: any) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };
  const time = useHKT(publishedAt);
  return (
    <Box
      sx={{
        border: "1px solid rgba(195, 204, 226, 0.3)",
        borderRadius: theme.spacing(1.5),
        color: theme.palette.primary.main,
        background: "transparent",
        height: "100%",
        "& a": {
          color: theme.palette.primary.main,
          textDecoration: "none",
        },
        "& img": {
          borderRadius: theme.spacing(1.5, 1.5, 0, 0),
          minHeight: "150px",
          width: "100%",
          objectFit: "cover",
        },
        [theme.breakpoints.up("laptop")]: {
          gridColumn: main ? "1 / span 2" : "auto",
        },
      }}
    >
      <Box ref={props.refProp} sx={{ padding: 0 }}>
        <Link href="/blog/[title]" as={`/blog/${slug}`}>
          <a>
            <Box
              height={
                isDesktop && main
                  ? ("324px!important" as any)
                  : isMobile
                  ? ("156px!important" as any)
                  : ("156px!important" as any)
              }
              width={
                isDesktop && main
                  ? ("100%!important" as any)
                  : isMobile
                  ? ("100%!important" as any)
                  : ("100%!important" as any)
              }
              sx={{
                "> span": {
                  width: "100%!important" as any,
                },
              }}
            >
              <Image
                loader={cmsLoader}
                src={
                  !featureImage
                    ? "/images/assets/blog-placeholder.png"
                    : featureImage
                }
                alt={title}
                width={isDesktop && main ? "100%" : isMobile ? "270px" : "100%"}
                height={
                  isDesktop && main ? "324px" : isMobile ? "156px" : "156px"
                }
                quality={100}
                objectFit="cover"
              />
            </Box>
            <Box
              width={
                isDesktop && main
                  ? ("690px!important" as any)
                  : isMobile
                  ? ("270px!important" as any)
                  : ("100%!important" as any)
              }
              sx={{
                padding: theme.spacing(2.5, 2.5, 0, 2.5),
                [theme.breakpoints.up("laptop")]: {
                  width: main
                    ? ("690px!important" as any)
                    : ("380px!important" as any),
                },
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  fontSize: theme.spacing(3),
                  paddingBottom: theme.spacing(3),
                  overflowWrap: "break-word",
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 400,
                  fontSize: theme.spacing(2),
                  overflowWrap: "break-word",
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
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              color: "rgba(255, 255, 255, 0.5)",
              fontWeight: 400,
              fontSize: "12px",
              [theme.breakpoints.up("laptop")]: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              },
            }}
          >
            <p>
              Posted by{" "}
              <Link href="/author/[author]" as={`/author/${author.slug}`}>
                <a
                  style={{
                    textDecoration: "underline",
                    color: "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  {author.name}
                </a>
              </Link>
            </p>
            <p className="date">{time}</p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Post;
