import React from 'react';
import { Box } from '@mui/material';
import { DetailCard } from './components';
import { details } from './config';

const Lineup = () => {
  return (
    <Box>
      {details.map((detail) => {
        const { image, icon, title, desc1, desc2, desc3, url, extra } = detail;
        return (
          <DetailCard
            image={image}
            icon={icon}
            title={title}
            desc1={desc1}
            desc2={desc2}
            desc3={desc3}
            url={url}
            extra={extra}
          />
        );
      })}
    </Box>
  );
};

export default Lineup;
