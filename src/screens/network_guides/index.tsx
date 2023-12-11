import { Box, useTheme } from "@mui/material";
import { useEffect } from "react";

import LayoutVal from "@src/components/layout_val";
import AppApolloProvider from "@src/utils/apollo";

import { Guide, NetworkInfo } from "./components";
import { LaptopCSS } from "./styles";

const NetworkGuides = ({ post }: any) => {
  const theme = useTheme();
  useEffect(() => {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
  }, []);

  if (!post) return null;

  return (
    <AppApolloProvider>
      <LayoutVal
        canonical={`https://www.forbole.com/staking/${post.slug}`}
        description={post.excerpt}
        footer
        image={post.featureImage}
        keywords={post.tags.map((x: { name: any }) => x.name ?? "")}
        stakingGuide
        title={post.title}
        twitterImage={post.featureImage}
        type="article"
      >
        <LaptopCSS>
          <NetworkInfo post={post} />
        </LaptopCSS>
        <LaptopCSS>
          <Guide post={post} />
        </LaptopCSS>
        <Box
          sx={{
            [theme.breakpoints.up("laptop")]: { height: theme.spacing(50) },
          }}
        />
      </LayoutVal>
    </AppApolloProvider>
  );
};

export default NetworkGuides;
