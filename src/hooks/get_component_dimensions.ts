import React from 'react';

export const useGetComponentDimension = () => {
  const [height, setHeight] = React.useState(0);
  const [width, setWidth] = React.useState(0);
  const ref: any = React.useRef(null);
  React.useEffect(() => {
    if (ref?.current?.clientHeight) {
      setHeight(ref.current.clientHeight);
    }
    if (ref?.current?.clientWidth) {
      setWidth(ref.current.clientWidth);
    }
  }, [ref?.current?.clientHeight]);

  return {
    width,
    height,
    ref,
  };
};
