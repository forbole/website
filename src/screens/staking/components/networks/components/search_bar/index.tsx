/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, {
  ComponentProps,
  FC,
  FocusEventHandler,
  HTMLAttributes,
  useState,
  useCallback,
} from 'react';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import ListItem from '@mui/material/ListItem';
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  ListItemIcon,
  ListItemText,
  Paper,
  PaperProps,
  Popper,
  PopperProps,
  InputAdornment,
  createFilterOptions,
  useTheme,
} from '@mui/material';
import { getNetworkInfo } from '@src/utils/network_info';
import { SearchIcon } from '@icons';
import { styles } from '@src/screens/about/components/mobile/about_us/styles';
import { networkKeys } from './config';
import { SearchBarProps } from './types';
import useStyles from './useStyles';

const filterOptions = createFilterOptions({
  matchFrom: 'start',
});

/**
 * It takes an object with a property called `startAdornment` and returns an object with a property
 * called `startAdornment`
 * @param InputProps - The InputProps prop is a prop that is passed to the TextField component. It's
 * an object that contains a startAdornment property.
 * @returns An object with the properties of InputProps and startAdornment.
 */
function addSearch(InputProps: ComponentProps<typeof TextField>['InputProps']) {
  const theme = useTheme();
  const startAdornment = (
    <InputAdornment position="start">
      <SearchIcon
        stroke={theme.palette.custom.forbole.indigo04}
        fontSize="small"
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
    <ListItem {...props} title={network.delegate} sx={styles.listItem}>
      <ListItemIcon>
        <Box className="image">
          <Image
            src={network.image}
            objectFit="contain"
            width="24px"
            height="24px"
            quality={100}
          />
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
  return <Options key={network.name} props={props} network={network} />;
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
      window.open(delegate, '_top');
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
  const { t } = useTranslation('staking');
  const theme = useTheme();
  const networkData: Array<Network> = networkKeys.map((x: string) =>
    getNetworkInfo(x)
  );
  const options = networkData.map((network) => ({
    label: network.name,
    network,
  }));
  const styles = useStyles();

  const renderInput: StyledAutocompleteProps['renderInput'] = useCallback(
    ({ InputProps, ...params }) => (
      <TextField
        {...params}
        placeholder={t('searchNetwork')}
        InputProps={addSearch(InputProps)}
        sx={styles.textField}
      />
    ),
    []
  );
  const [focused, setFocused] = useState(false);
  const handleFocus: FocusEventHandler = useCallback((event) => {
    setFocused(true);
    if (window.innerWidth < 768) {
      window.addEventListener('scroll', scrollLock);
      return;
    }
    const headerOffset = 100;
    const elementPosition = event.target.getBoundingClientRect().top;
    const top = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  }, []);
  const handleBlur = useCallback(() => {
    window.removeEventListener('scroll', scrollLock);
    setFocused(false);
  }, []);

  return (
    <Box
      className={
        focused
          ? 'searchbox__focused searchbox__container'
          : 'searchbox__container'
      }
      sx={styles.root}
    >
      <Autocomplete
        openOnFocus
        inputMode="search"
        popupIcon={null}
        noOptionsText={t('noResultsFound')}
        options={options}
        PaperComponent={PaperComponent}
        PopperComponent={PopperComponent}
        renderOption={renderOption}
        renderInput={renderInput}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlurCapture={handleBlur}
        filterOptions={filterOptions}
      />
      <Button
        variant="text"
        className="searchbox__cancel-btn"
        onClick={handleBlur}
      >
        {t('cancel')}
      </Button>
    </Box>
  );
};

function scrollLock() {
  window.scrollTo(0, 0);
}

export default SearchBar;
