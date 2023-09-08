import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { ArrowIcon } from '@icons';
import { styles } from './styles';
import ApplyDialog from '../apply_dialog';

const Opening = (props: any) => {
  const { t } = useTranslation('careers');
  const theme = useTheme();

  const { title, description, slug } = props;
  const [applyDialogOpen, setApplyDialogOpen] = React.useState({
    open: false,
    title,
  });
  return (
    <>
      <Box
        sx={{
          border: '2px solid rgba(195, 204, 226, 0.3)',
          borderRadius: theme.spacing(5.25),
          backdropFilter: 'blur(24px)',
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          color="primary.main"
          padding={theme.spacing(3.5)}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 600,
              fontSize: theme.spacing(2.25),
              paddingBottom: theme.spacing(3),
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 400,
              fontSize: theme.spacing(1.5),
              paddingBottom: theme.spacing(4),
            }}
          >
            {description}
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            sx={{
              [theme.breakpoints.up('laptop')]: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                width: '100%',
              },
            }}
          >
            <Button
              href={`/careers/${slug}`}
              variant="text"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                color: 'primary.main',
                fontWeight: 600,
                fontSize: theme.spacing(2),
                paddingBottom: theme.spacing(2),
                [theme.breakpoints.up('laptop')]: {
                  border: '1px solid #FFFFFF',
                  borderRadius: theme.spacing(20),
                  padding: theme.spacing(1.5, 2),
                  marginRight: 2,
                },
              }}
            >
              {t('learn more')}
              <Box
                sx={{
                  display: 'flex',
                  [theme.breakpoints.up('laptop')]: { display: 'none' },
                }}
              >
                <ArrowIcon />
              </Box>
            </Button>
            <Button
              sx={styles.button}
              onClick={() => setApplyDialogOpen({ open: true, title })}
            >
              {t('apply now')}
            </Button>
          </Box>
        </Box>
      </Box>
      <ApplyDialog
        setting={applyDialogOpen}
        onClose={() => setApplyDialogOpen({ open: false, title })}
      />
    </>
  );
};

export default Opening;