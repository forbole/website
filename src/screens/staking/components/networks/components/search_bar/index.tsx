import useTranslation from "next-translate/useTranslation";
import type { FocusEventHandler } from "react";
import { useCallback, useState } from "react";

import FormInput from "@src/components/form_input";
import SearchIcon from "@src/components/icons/icon_search.svg";

import * as styles from "./index.module.scss";

interface Props {
  networksFilter?: string;
  noResultsFound?: boolean;
  setNetworksFilter: (value: string) => void;
}

const SearchBar = ({
  networksFilter,
  noResultsFound,
  setNetworksFilter,
}: Props) => {
  const { t } = useTranslation("staking");

  const [focused, setFocused] = useState(false);

  const handleFocus: FocusEventHandler = useCallback((event) => {
    setFocused(true);

    const headerOffset = 100;
    const elementPosition = event.target.getBoundingClientRect().top;
    const top = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      behavior: "smooth",
      top,
    });
  }, []);

  return (
    <div
      className={[
        focused
          ? "searchbox__focused searchbox__container"
          : "searchbox__container",
        styles.root,
      ].join(" ")}
    >
      <span className={styles.inputWrap}>
        <FormInput
          classNameWrapper={styles.textField}
          onChange={(event) => {
            setNetworksFilter(event.target.value);
          }}
          onFocus={handleFocus}
          placeholder={t("searchNetwork")}
          rightText={<SearchIcon />}
          value={networksFilter}
        />
        {noResultsFound && (
          <span className={styles.noResults}>{t("noResultsFound")}</span>
        )}
      </span>
    </div>
  );
};

export default SearchBar;
