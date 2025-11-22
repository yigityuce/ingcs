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
