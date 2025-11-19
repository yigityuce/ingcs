import {css, unsafeCSS} from 'lit';
import {responsiveMediaQuery, SCREEN} from '../../../utilities';

export const classNames = {
  empty: 'empty',
};

export const styles = css`
  :host {
    --col-count: 2;
    display: grid;
    grid-template-columns: repeat(var(--col-count), 1fr);
    column-gap: var(--ing-size-gap-2x-large);
    row-gap: var(--ing-size-gap-x-large);

    ${responsiveMediaQuery(SCREEN.MOBILE)} {
      --col-count: 1;
    }

    ${responsiveMediaQuery(SCREEN.TABLET)} {
      --col-count: 1;
    }

    ing-employee-card {
      &:nth-child(2n) {
        justify-self: start;
      }

      &:nth-child(2n + 1) {
        justify-self: end;
      }
    }

    .${unsafeCSS(classNames.empty)} {
      grid-column: span var(--col-count);
      place-self: center;
      padding: var(--ing-size-spacing-large);
      display: flex;
      box-sizing: border-box;
      place-self: center;
      align-items: center;
      justify-content: center;
      min-height: 300px;
      max-width: 100%;
    }
  }
`;
