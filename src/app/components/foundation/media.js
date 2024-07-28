import { css } from 'styled-components';

export const Breakpoints = {
  desktop: 'desktop',
  desktopLarge: 'desktopLarge',
  mobile: 'mobile',
  mobileLarge: 'mobileLarge',
  tablet: 'tablet',
  tabletLarge: 'tabletLarge',
};

const breakpoints = {
  desktop: 1260,
  desktopLarge: 1512,
  mobile: 320,
  mobileLarge: 504,
  tablet: 756,
  tabletLarge: 1008,
};

function getMediaWidths({ max, min }) {
  return () => {
    let widths = '';

    if (min) {
      widths = `(min-width: ${breakpoints[min]}px)`;
      if (max) widths = `${widths} and `;
    }

    if (max) {
      widths = `${widths}(max-width: ${breakpoints[max] - 1}px)`;
    }

    return widths;
  };
}

function mediaFactory({ max, min }) {
  return (...args) => css`
    @media ${getMediaWidths({ max, min })} {
      // @ts-ignore
      ${css(...args)};
    }
  `;
}

export const mobileOnly = mediaFactory({ max: Breakpoints.mobile });
export const mobileLargeOnly = mediaFactory({
  max: Breakpoints.mobileLarge,
  min: Breakpoints.mobile,
});
export const tabletOnly = mediaFactory({
  max: Breakpoints.tablet,
  min: Breakpoints.mobileLarge,
});
export const tabletLargeOnly = mediaFactory({
  max: Breakpoints.tabletLarge,
  min: Breakpoints.tablet,
});
export const desktopOnly = mediaFactory({
  max: Breakpoints.desktop,
  min: Breakpoints.tabletLarge,
});
export const desktopLargeOnly = mediaFactory({
  max: Breakpoints.desktopLarge,
  min: Breakpoints.desktop,
});

export const aboveMobile = mediaFactory({ min: Breakpoints.mobile });
export const aboveMobileLarge = mediaFactory({
  min: Breakpoints.mobileLarge,
});
export const aboveTablet = mediaFactory({ min: Breakpoints.tablet });
export const aboveTabletLarge = mediaFactory({
  min: Breakpoints.tabletLarge,
});
export const aboveDesktop = mediaFactory({ min: Breakpoints.desktop });
export const aboveDesktopLarge = mediaFactory({
  min: Breakpoints.desktopLarge,
});

export const belowMobileLarge = mediaFactory({
  max: Breakpoints.mobileLarge,
});
export const belowTablet = mediaFactory({ max: Breakpoints.tablet });
export const belowTabletLarge = mediaFactory({
  max: Breakpoints.tabletLarge,
});
export const belowDesktop = mediaFactory({ max: Breakpoints.desktop });
export const belowDesktopLarge = mediaFactory({
  max: Breakpoints.desktopLarge,
});

const media = {
  mobileOnly,
  mobileLargeOnly,
  tabletOnly,
  tabletLargeOnly,
  desktopOnly,
  desktopLargeOnly,
  aboveMobile,
  aboveMobileLarge,
  aboveTablet,
  aboveTabletLarge,
  aboveDesktop,
  aboveDesktopLarge,
  belowMobileLarge,
  belowTablet,
  belowTabletLarge,
  belowDesktop,
  belowDesktopLarge,
};

export default media;
