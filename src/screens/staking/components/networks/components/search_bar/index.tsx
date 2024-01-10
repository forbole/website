import type { PaperProps, PopperProps } from "@mui/material";
import {
  Autocomplete,
  Button,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  TextField,
  createFilterOptions,
  useTheme,
} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import useTranslation from "next-translate/useTranslation";
import Image from "next/legacy/image";
import type { ComponentProps, FocusEventHandler, HTMLAttributes } from "react";
import { useCallback, useState } from "react";

import SearchIcon from "@src/components/icons/icon_search.svg";
import {
  getCanClickNetwork,
  handleNetworkClick,
} from "@src/utils/network_functions";
import type { Network } from "@src/utils/network_info";

import * as styles from "./index.module.scss";

const filterOptions = createFilterOptions({
  matchFrom: "any",
});

function scrollLock() {
  window.scrollTo(0, 0);
}

/**
 * It takes an object with a property called `startAdornment` and returns an object with a property
 * called `startAdornment`
 * @param InputProps - The InputProps prop is a prop that is passed to the TextField component. It's
 * an object that contains a startAdornment property.
 * @returns An object with the properties of InputProps and startAdornment.
 */
function useSearch(InputProps: ComponentProps<typeof TextField>["InputProps"]) {
  const theme = useTheme();

  const startAdornment = (
    <InputAdornment position="start">
      <SearchIcon
        fontSize="small"
        stroke={theme.palette.custom.forbole.indigo04}
      />
    </InputAdornment>
  );

  return { ...InputProps, startAdornment };
}

interface OptionsProps {
  network: Network;
  props: HTMLAttributes<HTMLLIElement>;
}

const Options = ({ network, props }: OptionsProps) => (
  <ListItem
    {...props}
    className={[styles.listItem, props.className || ""].join(" ")}
    title={network.delegate}
  >
    <ListItemIcon>
      <div className="image">
        {network.image && (
          <Image
            alt=""
            height="32"
            objectFit="contain"
            quality={100}
            src={network.image}
            width="32"
          />
        )}
      </div>
    </ListItemIcon>
    <ListItemText>{network.name}</ListItemText>
  </ListItem>
);

/**
 * It takes a React element and a network object, and returns a React element
 * @param props - HTMLAttributes<HTMLLIElement>
 * @param {unknown} option - The option that is being rendered.
 * @returns A React component
 */
function renderOption(props: HTMLAttributes<HTMLLIElement>, option: unknown) {
  const { network } = option as { network: Network };

  return <Options key={network.name} network={network} props={props} />;
}

function handleChange(_event: unknown, value: unknown) {
  if (value) {
    const { network } = value as { network: Network };

    handleNetworkClick(network);
  }
}

const PopperComponent = ({ className, ...props }: PopperProps) => (
  <Popper {...props} className={[styles.popper, className || ""].join(" ")} />
);

const PaperComponent = ({ className, ...props }: PaperProps) => (
  <Paper {...props} className={[styles.paper, className || ""].join(" ")} />
);

type StyledAutocompleteProps = ComponentProps<typeof Autocomplete>;

interface Props {
  sortedNetworks: Network[];
}

const SearchBar = ({ sortedNetworks }: Props) => {
  const { t } = useTranslation("staking");

  const optionsFull = sortedNetworks
    .map((network) => ({
      label: network.name,
      network,
    }))
    .filter((item) => getCanClickNetwork(item.network));

  const optionsNames = optionsFull.map((item) => item.label);

  const options = optionsFull.filter(
    (item, idx) => optionsNames.indexOf(item.label) === idx,
  );

  const RenderInput: StyledAutocompleteProps["renderInput"] = useCallback(
    ({ className, InputProps, ...params }) => (
      <TextField
        {...params}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        InputProps={useSearch(InputProps)}
        className={[styles.textField, className || ""].join(" ")}
        placeholder={t("searchNetwork")}
      />
    ),
    [t],
  );

  const [focused, setFocused] = useState(false);

  const handleFocus: FocusEventHandler = useCallback((event) => {
    setFocused(true);

    if (window.innerWidth < 768) {
      window.addEventListener("scroll", scrollLock);

      return;
    }

    const headerOffset = 100;
    const elementPosition = event.target.getBoundingClientRect().top;
    const top = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      behavior: "smooth",
      top,
    });
  }, []);

  const handleBlur = useCallback(() => {
    window.removeEventListener("scroll", scrollLock);
    setFocused(false);
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
      <Autocomplete
        PaperComponent={PaperComponent}
        PopperComponent={PopperComponent}
        filterOptions={filterOptions}
        inputMode="search"
        noOptionsText={t("noResultsFound")}
        onBlurCapture={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
        openOnFocus
        options={options}
        popupIcon={null}
        renderInput={RenderInput}
        renderOption={renderOption}
      />
      <Button
        className="searchbox__cancel-btn"
        onClick={handleBlur}
        variant="text"
      >
        {t("cancel")}
      </Button>
    </div>
  );
};

export default SearchBar;
