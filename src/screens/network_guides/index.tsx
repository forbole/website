import { Box } from "@mui/material";
import { useEffect } from "react";

import LayoutVal from "@src/components/layout_val";
import GQLProvider from "@src/utils/gql";

import Guide from "./components/guide";
import NetworkInfo from "./components/network_info";
import * as styles from "./index.module.scss";
import { LaptopCSS } from "./styles";

const NetworkGuides = ({ post }: any) => {
  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      left: 0,
      top: 0,
    });
  }, []);

  if (!post) return null;

  return (
    <GQLProvider>
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
        <Box className={styles.offset} />
      </LayoutVal>
    </GQLProvider>
  );
};

export default NetworkGuides;
