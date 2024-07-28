import { defaultTokens as styles } from '@kiwicom/orbit-design-tokens';

export const background = {
  darkPrim: styles.backgroundBadgeDark,
  darkSec: styles.backgroundBadgeDark,
  lightPrim: styles.backgroundBody,
  lightSec: styles.backgroundBadgeNeutral,
  DashboardBackGroundColor: '#FFFFFF',
  DashboardContainersColor: '#F4F3EF',
};
export const boxShadow = {
  DashboardBoxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
};

export const paddingMap = {
  xxxxl: '80px',
  xxxl: styles.spaceXXXLarge,
  xxl: styles.spaceXXLarge,
  xl: styles.spaceXLarge,
  md: styles.spaceMedium,
  lg: styles.spaceLarge,
  sm: styles.spaceSmall,
  xS: styles.spaceXSmall,
  xxS: styles.spaceXXSmall,
  xxxS: '5px',
};

export const marginMap = {
  xxxl: styles.spaceXXXLarge,
  xxl: styles.spaceXXLarge,
  xl: styles.spaceXLarge,
  md: styles.spaceMedium,
  lg: styles.spaceLarge,
  sm: styles.spaceSmall,
  xS: styles.spaceXSmall,
  xxS: styles.spaceXXSmall,
};

export const fontSizeMap = {
  title1: styles.fontSizeHeadingTitle1,
  title2: styles.fontSizeHeadingTitle2,
  title3: styles.fontSizeHeadingTitle3,
  title4: styles.fontSizeHeadingTitle4,
  title5: styles.fontSizeHeadingTitle5,
};

export const borderRadius = {
  md: '20px',
  sm: '10px',
  xs: '5px',
};

export const borders = {
  xs: '5px solid grey',
  sm: '10px solid green',
};

export const colors = {
  primary: 'gray',
  secondary: 'blue',
  danger: 'red',
  warning: 'darkorange',
  success: 'green',
  gray: '#696969',
  spinner: '#f3f3f3',
  header: '#1A2036',
  pink: '#C86DD7',
  white: '#FFFFFF',
  black: '#000000',
  blue: '#7D8399',
  lightBlue: '#D7DDF3',
  borders: {
    primary: styles.borderColorTableHead,
    secondary: styles.borderColorTag,
    disabled: 'gray',
    enabled: 'black',
  },
  button: {
    background: '#ffffff',
  },
  defaultButton: {
    background: 'orange',
  },
  modal: {
    border: '#ccc',
    backgroundColor: 'white',
    inputColor: '#696969',
  },

  search: {
    color: '#FF1493',
    background: '#B0B0B0',
  },
  updateProfile: {
    color: '#50c7cb',
  },
};
