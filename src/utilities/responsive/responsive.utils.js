import {unsafeCSS} from 'lit';
import {BREAKPOINTS} from '../../constants';

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
