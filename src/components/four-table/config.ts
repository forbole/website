import useTranslation from "next-translate/useTranslation";
import { useMemo } from "react";

const usePlans = () => {
  const { t } = useTranslation("developer_tools");

  return useMemo(
    () => [
      {
        title: t("plan_item1_title"),
        price: "0",
        currency: t("plan_item1_currency"),
        description: t("plan_item1_description"),
        features: t("plan_item1_features"),
        image: "/images/assets/24.png",
        btnName: t("try_now"),
        btnHref: "https://devtools.forbole.com",
      },
      {
        title: t("plan_item2_title"),
        price: "50",
        currency: t("plan_item2_currency"),
        description: t("plan_item2_description"),
        features: t("plan_item2_features"),
        image: "/images/assets/24.png",
        btnName: t("contact_us"),
        btnHref: "",
      },
      {
        title: t("plan_item3_title"),
        price: "200",
        currency: t("plan_item3_currency"),
        description: t("plan_item3_description"),
        features: [
          t("plan_item3_features_1"),
          t("plan_item3_features_2"),
          t("plan_item3_features_3"),
        ],
        image: "/images/assets/24.png",
        btnName: t("contact_us"),
        btnHref: "",
      },
      {
        title: t("plan_item4_title"),
        price: t("plan_item4_price"),
        currency: t("plan_item4_currency"),
        description: t("plan_item4_description"),
        features: [
          t("plan_item4_features_1"),
          t("plan_item4_features_2"),
          t("plan_item4_features_3"),
          t("plan_item4_features_4"),
          t("plan_item4_features_5"),
        ],
        image: "/images/assets/24.png",
        btnName: t("contact_us"),
        btnHref: "",
      },
    ],
    [t],
  );
};

export default usePlans;
