import {css} from 'lit';
import {responsiveMediaQuery, SCREEN} from '../../../utilities';

export const styles = css`
  :host {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: var(--ing-size-gap-2x-large);
    row-gap: var(--ing-size-gap-x-large);

    ${responsiveMediaQuery(SCREEN.MOBILE)} {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    ${responsiveMediaQuery(SCREEN.TABLET)} {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    ing-employee-card {
      &:nth-child(2n) {
        justify-self: start;
      }

      &:nth-child(2n + 1) {
        justify-self: end;
      }
    }
  }
`;
