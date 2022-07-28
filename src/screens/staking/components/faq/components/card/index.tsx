import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import useTranslation from 'next-translate/useTranslation';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  ListItem,
  useTheme,
} from '@mui/material';
import { ExpandMoreIcon } from '@icons';
import { FAQProps } from '../../config';

const Trans = dynamic(() => import('next-translate/Trans'), { ssr: false });

const Card = (props: FAQProps) => {
  const theme = useTheme();
  const { t } = useTranslation('staking');
  const {
    question,
    para1,
    para2,
    trans,
    para3,
    desc,
    bullet1,
    bullet2,
    bullet3,
  } = props;

  return (
    <Box>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography
            variant="h3"
            sx={{ color: theme.palette.custom.forbole.blue }}
          >
            {t(question)}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {para1 && <Typography variant="body1">{t(para1)}</Typography>}
          {para2 && <Typography variant="body1">{t(para2)}</Typography>}
          {trans && (
            <Trans
              i18nKey={t(trans)}
              components={[
                <Typography
                  variant="body1"
                  color={theme.palette.custom.forbole.blue}
                  sx={{
                    display: 'inline',
                    fontSize: theme.spacing(1.5),
                    [theme.breakpoints.up('laptop')]: {
                      fontSize: theme.spacing(2.5),
                    },
                  }}
                />,
                <Link href="/stake-now">
                  <Typography
                    color="primary.main"
                    fontWeight={900}
                    sx={{
                      display: 'inline',
                      fontSize: theme.spacing(1.5),
                      [theme.breakpoints.up('laptop')]: {
                        fontSize: theme.spacing(2.5),
                        display: 'inline',
                      },
                    }}
                  />
                </Link>,
              ]}
            />
          )}
          {para3 && <Typography variant="body1">{t(para3)}</Typography>}
          {desc && <Typography variant="body1">{t(desc)}</Typography>}
          {bullet1 && (
            <ListItem sx={{ display: 'list-item' }}>{t(bullet1)}</ListItem>
          )}
          {bullet2 && (
            <ListItem sx={{ display: 'list-item' }}>{t(bullet2)}</ListItem>
          )}
          {bullet3 && (
            <ListItem sx={{ display: 'list-item' }}>{t(bullet3)}</ListItem>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Card;
