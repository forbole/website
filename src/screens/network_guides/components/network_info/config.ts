import useTranslation from "next-translate/useTranslation";
import { useMemo } from "react";

type ParamsProps = {
  title: string;
  stats: number | string;
  type: string;
};

type NetworkGuideProps = {
  [graphqlKey: string]: ParamsProps[];
};

export const useCosmosNetworkGuideParams = (): NetworkGuideProps => {
  const { t } = useTranslation("staking");
  const infoItems = useMemo(
    () => [
      {
        title: t("staked by forbole"),
        stats: "-",
        type: t("money"),
      },
      {
        title: t("apy"),
        stats: 0,
        type: t("percentage"),
      },
      {
        title: t("commission"),
        stats: 0,
        type: t("percentage"),
      },
      {
        title: t("unbonding period"),
        stats: "-",
        type: t("string"),
      },
    ],
    [t],
  );

  return {
    cosmos: infoItems,
    emoney: infoItems,
    akash: infoItems,
    agoric: infoItems,
    assetmantle: infoItems,
    axelar: infoItems,
    bitcanna: infoItems,
    bitsong: infoItems,
    cheqd: infoItems,
    chihuahua: infoItems,
    comdex: infoItems,
    crescent: infoItems,
    ixo: infoItems,
    kava: infoItems,
    likecoin: infoItems,
    osmosis: infoItems,
    persistence: infoItems,
    secret: infoItems,
    sentinelhub: infoItems,
    nomic: infoItems,
    gravitybridge: infoItems,
    cro: infoItems,
    evmos: infoItems,
    juno: infoItems,
    sommelier: infoItems,
    stargaze: infoItems,
    stride: infoItems,
    teritori: infoItems,
  };
};
