/* eslint-disable no-unused-vars */
import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, Typography, useTheme } from '@mui/material';
import { LayoutVal } from '@components';
import { NetworkInfo, Guide } from './components';
import { LaptopCSS } from './styles';

const NetworkGuides = ({ post }: any) => {
  const { t } = useTranslation('staking');
  const theme = useTheme();
  React.useEffect(() => {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <LayoutVal
      title={post.title}
      description={post.excerpt}
      type="article"
      image={post.featureImage}
      twitterImage={post.featureImage}
      keywords={post.tags.map((x: { name: any }) => x.name ?? '')}
      navLink="staking"
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
        sx={{ [theme.breakpoints.up('laptop')]: { height: theme.spacing(50) } }}
      />
    </LayoutVal>
  );
};

export default NetworkGuides;
