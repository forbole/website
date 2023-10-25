import moment from "moment-timezone";
import { useEffect, useState } from "react";

const useHKT = (publishedAt: string) => {
  const [time, setTime] = useState(publishedAt);
  useEffect(() => {
    const hkt = moment
      .tz(publishedAt, "Do MMM YYYY, h:mm a", "Asia/Hong_Kong")
      .format("Do MMM YYYY, h:mm a");
    setTime(hkt);
  }, [publishedAt]);
  return time;
};

export default useHKT;
