/* eslint-disable no-nested-ternary */

/* eslint-disable react/destructuring-assignment */

/* eslint-disable jsx-a11y/anchor-is-valid */
import { useHKT, useWindowDimensions } from "@hooks";
import { Box, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Post = (props: any) => {
  const theme = useTheme();
  const { isDesktop, isMobile } = useWindowDimensions();
  const { post, main = false } = props;
  const { featureImage, title, excerpt, publishedAt, slug, author } = post;
  const cmsLoader = ({ src, width, quality }: any) =>
    `${src}?w=${width}&q=${quality || 75}`;
  const time = useHKT(publishedAt);
  return (
    <Box
      sx={{
        "border": "1px solid rgba(195, 204, 226, 0.3)",
        "borderRadius": theme.spacing(1.5),
        "color": "primary.main",
        "background": "transparent",
        "height": "100%",
        "& a": {
          color: "primary.main",
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
        <Link as={`/blog/${slug}`} href="/blog/[title]">
          <a>
            <Box
              height={
                isDesktop && main
                  ? ("324px!important" as any)
                  : isMobile
                  ? ("156px!important" as any)
                  : ("156px!important" as any)
              }
              sx={{
                "> span": {
                  width: "100%!important" as any,
                },
              }}
              width={
                isDesktop && main
                  ? ("100%!important" as any)
                  : isMobile
                  ? ("100%!important" as any)
                  : ("100%!important" as any)
              }
            >
              <Image
                alt={title}
                height={
                  isDesktop && main ? "324px" : isMobile ? "156px" : "156px"
                }
                loader={cmsLoader}
                objectFit="cover"
                quality={100}
                src={
                  !featureImage
                    ? "/images/assets/blog-placeholder.png"
                    : featureImage
                }
                width={isDesktop && main ? "100%" : isMobile ? "270px" : "100%"}
              />
            </Box>
            <Box
              sx={{
                padding: theme.spacing(2.5, 2.5, 0, 2.5),
                [theme.breakpoints.up("laptop")]: {
                  width: main
                    ? ("690px!important" as any)
                    : ("380px!important" as any),
                },
              }}
              width={
                isDesktop && main
                  ? ("690px!important" as any)
                  : isMobile
                  ? ("270px!important" as any)
                  : ("100%!important" as any)
              }
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: theme.spacing(3),
                  paddingBottom: theme.spacing(3),
                  overflowWrap: "break-word",
                }}
                variant="h3"
              >
                {title}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: theme.spacing(2),
                  overflowWrap: "break-word",
                }}
                variant="body1"
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
              <Link as={`/author/${author.slug}`} href="/author/[author]">
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
