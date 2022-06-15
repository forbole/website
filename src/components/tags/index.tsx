/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import { styles } from './styles';

const Tags = ({ tags = [] }: any) => {
  const { t } = useTranslation('blog');
  const theme = useTheme();
  return (
    <Box sx={styles.tagsContainer}>
      <Typography
        variant="h3"
        color={
          theme.palette.mode === 'dark'
            ? theme.palette.primary.main
            : theme.palette.text.primary
        }
      >
        {t('tags')}
      </Typography>
      <Box component="ul" sx={styles.tagCSS}>
        {tags.map((tag: any) => (
          <Box component="li" key={tag.slug} sx={styles.listCSS}>
            <Link href="/tag/[tag]" as={`/tag/${tag.slug}`}>
              <a>{tag.name}</a>
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Tags;
