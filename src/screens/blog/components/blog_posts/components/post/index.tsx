/* eslint-disable no-nested-ternary */
import { Box, Typography, useTheme } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";

import placeholderImage from "@src/../public/images/assets/blog-placeholder.png";
import { NoSSR } from "@src/components/no-ssr";
import { useWindowDimensions } from "@src/hooks/get_screen_size";
import useHKT from "@src/hooks/useHKT";

const Post = (props: any) => {
  const theme = useTheme();
  const { t } = useTranslation("blog");
  const { isDesktop, isMobile } = useWindowDimensions();
  const { post, main = false, refProp } = props;
  const { featureImage, title, excerpt, publishedAt, slug, author } = post;
  const cmsLoader = ({ src, width, quality }: any) =>
    `${src}?w=${width}&q=${quality || 75}`;
  const time = useHKT(publishedAt);

  return (
    <Box
      data-test="post-summary-item"
      sx={{
        "border": "1px solid rgba(195, 204, 226, 0.3)",
        "borderRadius": theme.spacing(1.5),
        "color": theme.palette.primary.main,
        "background": "transparent",
        "height": "100%",
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
      <Box ref={refProp} sx={{ padding: 0 }}>
        <Link as={`/blog/${slug}`} href="/blog/[title]">
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
              height={isDesktop && main ? "324" : isMobile ? "156" : "156"}
              loader={cmsLoader}
              src={!featureImage ? placeholderImage : featureImage}
              style={{ objectFit: "cover" }}
              width={isDesktop && main ? "500" : isMobile ? "270" : "500"}
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
                lineHeight: 1.8,
              }}
              variant="body1"
            >
              {excerpt}
            </Typography>
          </Box>
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
              {t("Posted by")}{" "}
              <Link
                as={`/author/${author.slug}`}
                href="/author/[author]"
                style={{
                  textDecoration: "underline",
                  color: "rgba(255, 255, 255, 0.5)",
                }}
              >
                {author.name}
              </Link>
            </p>
            <NoSSR>
              <p className="date">{time}</p>
            </NoSSR>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Post;
