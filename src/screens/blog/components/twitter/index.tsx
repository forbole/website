import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, Typography, useTheme } from '@mui/material';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { styles } from './styles';

const Twitter = () => {
  const { t } = useTranslation('blog');
  const theme = useTheme();

  return (
    <Box sx={styles.twitterCSS}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          fontSize: theme.spacing(3),
          paddingBottom: theme.spacing(1.5),
        }}
      >
        {t('twitter')}
      </Typography>
      <Box>
        <TwitterTimelineEmbed
          noHeader
          sourceType="profile"
          screenName="forbole"
          options={{
            height: 500,
          }}
          theme="dark"
          linkColor="#FFFFFF"
          borderColor="rgba(116, 136, 188, 0.3)"
          transparent
        />
      </Box>
    </Box>
  );
};

export default Twitter;
