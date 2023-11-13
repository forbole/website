import { useEffect, useRef, useState } from "react";

export const useCounter = (targetValue: unknown) => {
  const [counterValue, setCounterValue] = useState<unknown>(0);
  const counterRef = useRef(null);
  const divisor = useRef<number | null>(null);
  const intervalId = useRef<number | null>(null);
  const hasViewed = useRef<unknown>(false);

  const clearInterval = () => {
    if (intervalId.current) {
      window.clearInterval(intervalId.current);
    }
    intervalId.current = null;
  };

  useEffect(() => {
    const init = () => {
      if (hasViewed.current === targetValue) return;

      if (typeof targetValue === "number") {
        setCounterValue(0);

        divisor.current = Math.ceil(targetValue / 200);

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

    if (typeof IntersectionObserver === "undefined" || !counterRef?.current) {
      init();

      return () => {};
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        init();
        hasViewed.current = targetValue;
      }
    });

    observer.observe(counterRef?.current);

    return () => {
      observer.disconnect();
    };
  }, [targetValue]);

  useEffect(
    () => () => {
      clearInterval();
    },
    [],
  );

  return {
    counterRef,
    counterValue,
  };
};
