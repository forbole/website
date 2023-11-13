import { useEffect, useRef, useState } from "react";

export const useCounter = (targetValue: unknown) => {
  const [counterValue, setCounterValue] = useState<unknown>(0);
  const counterRef = useRef(null);
  const divisor = useRef<number | null>(null);
  const intervalId = useRef<number | null>(null);
  const hasViewed = useRef(false);

  const clearInterval = () => {
    if (intervalId.current) {
      window.clearInterval(intervalId.current);
    }
    intervalId.current = null;
  };

  useEffect(() => {
    const init = () => {
      if (typeof targetValue === "number") {
        setCounterValue(0);

        divisor.current = Math.ceil(targetValue / 100);

        clearInterval();

        intervalId.current = window.setInterval(() => {
          window.requestAnimationFrame(() => {
            setCounterValue((prev: unknown) => {
              if (
                typeof prev !== "number" ||
                typeof divisor.current !== "number"
              )
                return prev;

              const newValue = prev + divisor.current;
              if (newValue >= targetValue) {
                clearInterval();
                return targetValue;
              }
              return newValue;
            });
          });
        }, 16);
      } else {
        setCounterValue(targetValue);
      }
    };

    if (
      typeof IntersectionObserver === "undefined" ||
      !counterRef?.current ||
      hasViewed.current
    ) {
      init();
      return () => {
        clearInterval();
      };
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        hasViewed.current = true;
        init();
      }
    });

    observer.observe(counterRef?.current);

    return () => {
      observer.disconnect();
      clearInterval();
    };
  }, [targetValue]);

  return {
    counterRef,
    counterValue,
  };
};
