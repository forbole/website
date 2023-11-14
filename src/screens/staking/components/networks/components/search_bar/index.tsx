import { SearchIcon } from "@icons";
import {
  Autocomplete,
  Box,
  Button,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  Paper,
  PaperProps,
  Popper,
  PopperProps,
  TextField,
  createFilterOptions,
  useTheme,
} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import { Network, getNetworkInfo, logos } from "@src/utils/network_info";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import {
  ComponentProps,
  FC,
  FocusEventHandler,
  HTMLAttributes,
  useCallback,
  useState,
} from "react";

import { SearchBarProps } from "./types";
import useStyles from "./useStyles";

const filterOptions = createFilterOptions({
  matchFrom: "start",
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

const Options: FC<OptionsProps> = ({ props, network }) => {
  const styles = useStyles();
  return (
    <ListItem {...props} sx={styles.listItem} title={network.delegate}>
      <ListItemIcon>
        <Box className="image">
          {network.image && (
            <Image
              height="32px"
              objectFit="contain"
              quality={100}
              src={network.image}
              width="32px"
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

/**
 * `handleChange` is a function that takes an event and a value, and if the value is truthy,
 * it opens a new window to the URL of the network
 * @param {unknown} _event - unknown - This is the event that is triggered when
 * the user clicks on thedropdown.
 * @param {unknown} value - The value of the selected item.
 */
function handleChange(_event: unknown, value: unknown) {
  if (value) {
    const { network } = value as { network: Network };
    const { delegate } = network;
    if (delegate) {
      window.open(delegate, "_top");
    }
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

const SearchBar: FC<SearchBarProps> = () => {
  const { t } = useTranslation("staking");
  const keys = Object.keys(logos);
  const networkData: Array<Network> = keys
    .sort()
    .map((x: string) => getNetworkInfo(x));

  const networkNames = networkData.map((network) => network.name);
  const options = networkData
    .map((network) => ({
      label: network.name,
      network,
    }))
    .filter((network, idx) => networkNames.indexOf(network.label) === idx);

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
        filterOptions={filterOptions}
        inputMode="search"
        noOptionsText={t("noResultsFound")}
        onBlurCapture={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
        openOnFocus
        options={options}
        PaperComponent={PaperComponent}
        PopperComponent={PopperComponent}
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
