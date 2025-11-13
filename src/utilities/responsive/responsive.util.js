import {unsafeCSS} from 'lit';

export const SCREEN = {
  MOBILE: 'MOBILE',
  TABLET: 'TABLET',
  DESKTOP: 'DESKTOP',
};

export const BREAKPOINTS = {
  [SCREEN.MOBILE]: {min: undefined, max: 600},
  [SCREEN.TABLET]: {min: 601, max: 1024},
  [SCREEN.DESKTOP]: {min: 1025, max: undefined},
};

// TODO: apply everywhere
/** @param { keyof SCREEN} screen */
export const responsiveMediaQuery = (screen) => {
  return unsafeCSS(
    `@media ${[
      'screen',
      BREAKPOINTS[screen].min
        ? `(min-width: ${BREAKPOINTS[screen].min}px)`
        : undefined,

      BREAKPOINTS[screen].max
        ? `(max-width: ${BREAKPOINTS[screen].max}px)`
        : undefined,
    ]
      .filter(Boolean)
      .join(' and ')}`
  );
};
