import useTranslation from "next-translate/useTranslation";
import { useMemo } from "react";

import MenuList from "../menu_list";

const CompanyMenuButton = () => {
  const { t } = useTranslation("common");

  const menuCompanyList = useMemo(
    () => [
      {
        link: "/about",
        name: t("about"),
      },
      {
        link: "/blog",
        name: t("blog"),
      },
      {
        link: "/contact",
        name: t("contact"),
      },
    ],
    [t],
  );

  return <MenuList menuList={menuCompanyList} />;
};

export default CompanyMenuButton;
