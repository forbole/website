import React from "react";
import { BodyCSS } from "./styles";
import { MooncakeDetails, MooncakeImg } from "@components";

const Mobile = () => {
  return (
    <BodyCSS>
      <MooncakeImg />
      <MooncakeDetails />
    </BodyCSS>
  );
};

export default Mobile;
