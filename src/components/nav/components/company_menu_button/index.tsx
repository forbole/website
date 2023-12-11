import useTranslation from "next-translate/useTranslation";
import { useMemo } from "react";

import MenuList from "../menu_list";

const CompanyMenuButton = () => {
  const { t } = useTranslation("common");

  const menuCompanyList = useMemo(
    () => [
      {
        name: t("about"),
        link: "/about",
      },
      {
        name: t("blog"),
        link: "/blog",
      },
      {
        name: t("contact"),
        link: "/contact",
      },
    ],
    [t],
  );

  return <MenuList menuList={menuCompanyList} />;
};

export default CompanyMenuButton;
