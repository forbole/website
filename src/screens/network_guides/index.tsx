import { LayoutVal } from "@components";
import { Box, useTheme } from "@mui/material";
import React from "react";

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
      title={post.title}
      description={post.excerpt}
      type="article"
      image={post.featureImage}
      twitterImage={post.featureImage}
      keywords={post.tags.map((x: { name: any }) => x.name ?? "")}
      stakingGuide
      footer
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
