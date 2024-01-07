import { useEffect, useRef, useState } from "react";

import { IS_E2E } from "@src/utils/e2e";

export const useCounter = (targetValue: unknown) => {
  const [counterValue, setCounterValue] = useState<unknown>(0);
  const counterRef = useRef(null);
  const divisor = useRef<null | number>(null);
  const intervalId = useRef<null | number>(null);
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

      if (typeof targetValue === "number" && !IS_E2E) {
        setCounterValue(0);

        divisor.current = targetValue * (targetValue > 100 ? 0.01 : 0.006);

        clearInterval();

        let pending = false;

        intervalId.current = window.setInterval(() => {
          if (pending) return;

          pending = true;

          window.requestAnimationFrame(() => {
            pending = false;

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
        });
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
