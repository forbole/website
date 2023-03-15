import { useEffect, useState } from 'react';
import moment from 'moment-timezone';

export const useHKT = (publishedAt: string) => {
  const [time, setTime] = useState(publishedAt);
  useEffect(() => {
    const hkt = moment
      .tz(publishedAt, 'Do MMM YYYY, h:mm a', 'Asia/Hong_Kong')
      .format('Do MMM YYYY, h:mm a');
    setTime(hkt);
  }, [publishedAt]);
  return time;
};
