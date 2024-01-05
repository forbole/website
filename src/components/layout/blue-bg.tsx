"use client";

import { useEffect } from "react";

const BlueBg = () => {
  useEffect(() => {
    const currentColor = document.body.style.background;

    document.body.style.background = "rgb(23, 26, 75)";

    return () => {
      document.body.style.background = currentColor;
    };
  }, []);

  return null;
};

export default BlueBg;
