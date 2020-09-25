import React from "react";
import { useTranslation } from "i18n";
import { TermsOfService, AnimatedNetwork } from "@components";
import { networkData } from "../../config";
import {
  SupportedNetworksCSS,
  HeaderContentCSS,
  NetworkListCSS,
} from "./styles";

const SupportedNetworks = () => {
  const { t } = useTranslation("stake_now");
  return (
    <SupportedNetworksCSS>
      <HeaderContentCSS>
        <h2>{t("supportedNetworks")}</h2>
        <p>{t("supportedNeworksContent")}</p>
        <TermsOfService
          trigger={<p className="terms">{t("termsOfService")}</p>}
        />
      </HeaderContentCSS>
      <NetworkListCSS>
        {networkData.map((x) => (
          <AnimatedNetwork
            key={x.name}
            name={x.name}
            image={x.image}
            amount={x.amount}
          />
        ))}
      </NetworkListCSS>
    </SupportedNetworksCSS>
  );
};

export default SupportedNetworks;
