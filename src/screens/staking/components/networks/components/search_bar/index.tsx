import type { PaperProps, PopperProps } from "@mui/material";
import {
  Autocomplete,
  Box,
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

import { SearchIcon } from "@src/components/icons";
import {
  getCanClickNetwork,
  handleNetworkClick,
} from "@src/utils/network_functions";
import type { Network } from "@src/utils/network_info";

import useStyles from "./useStyles";

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
  props: HTMLAttributes<HTMLLIElement>;
  network: Network;
}

const Options = ({ props, network }: OptionsProps) => {
  const styles = useStyles();

  return (
    <ListItem {...props} sx={styles.listItem} title={network.delegate}>
      <ListItemIcon>
        <Box className="image">
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
        </Box>
      </ListItemIcon>
      <ListItemText>{network.name}</ListItemText>
    </ListItem>
  );
};

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

const PopperComponent = (props: PopperProps) => {
  const styles = useStyles();

  return <Popper {...props} sx={styles.popper} />;
};

const PaperComponent = (props: PaperProps) => {
  const styles = useStyles();

  return <Paper {...props} sx={styles.paper} />;
};

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

  const styles = useStyles();

  const RenderInput: StyledAutocompleteProps["renderInput"] = useCallback(
    ({ InputProps, ...params }) => (
      <TextField
        {...params}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        InputProps={useSearch(InputProps)}
        placeholder={t("searchNetwork")}
        sx={styles.textField}
      />
    ),
    [styles.textField, t],
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
      top,
      behavior: "smooth",
    });
  }, []);

  const handleBlur = useCallback(() => {
    window.removeEventListener("scroll", scrollLock);
    setFocused(false);
  }, []);

  return (
    <Box
      className={
        focused
          ? "searchbox__focused searchbox__container"
          : "searchbox__container"
      }
      sx={styles.root}
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
    </Box>
  );
};

export default SearchBar;
