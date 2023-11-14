import { Box, useTheme } from "@mui/material";
import React from "react";

import { LayoutVal } from "@components";

import { Guide, NetworkInfo } from "./components";
import { LaptopCSS } from "./styles";

const NetworkGuides = ({ post }: any) => {
  const theme = useTheme();
  React.useEffect(() => {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <LayoutVal
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
        sx={{ [theme.breakpoints.up("laptop")]: { height: theme.spacing(50) } }}
      />
    </LayoutVal>
  );
};

export default NetworkGuides;
