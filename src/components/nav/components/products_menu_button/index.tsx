import useTranslation from "next-translate/useTranslation";
import { useMemo } from "react";

import MenuList from "../menu_list";

const ProductsMenuButton = () => {
  const { t } = useTranslation("common");

  const menuProductsList = useMemo(
    () => [
      {
        name: t("validator-infrastructure"),
        link: "/infrastructure",
      },
      {
        name: t("native-staking-service"),
        link: "/staking-service",
      },
      {
        name: t("blockchain-data-analytics-tools"),
        link: "/analytics-tools",
      },
      {
        name: t("developer-tools"),
        link: "/developer-tools",
      },
      {
        name: t("enterprise-solution"),
        link: "/enterprise-solution",
      },
    ],
    [t],
  );

  return <MenuList menuList={menuProductsList} />;
};

export default ProductsMenuButton;
