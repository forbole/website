import useTranslation from "next-translate/useTranslation";
import { useMemo } from "react";

import MenuList from "../menu_list";

const ProductsMenuButton = () => {
  const { t } = useTranslation("common");

  const menuProductsList = useMemo(
    () => [
      {
        link: "/infrastructure",
        name: t("validator-infrastructure"),
      },
      {
        link: "/staking-service",
        name: t("native-staking-service"),
      },
      {
        link: "/analytics-tools",
        name: t("blockchain-data-analytics-tools"),
      },
      {
        link: "/developer-tools",
        name: t("developer-tools"),
      },
      {
        link: "/enterprise-solution",
        name: t("enterprise-solution"),
      },
    ],
    [t],
  );

  return <MenuList menuList={menuProductsList} />;
};

export default ProductsMenuButton;
