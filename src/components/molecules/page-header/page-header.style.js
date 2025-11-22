import {css} from 'lit';
import {responsiveMediaQuery} from '../../../utilities';
import {SCREEN} from '../../../constants';

export const style = css`
  :host {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--ing-size-gap-x-large);

    ${responsiveMediaQuery(SCREEN.MOBILE)} {
      flex-direction: column;
    }

    ${responsiveMediaQuery(SCREEN.TABLET)} {
      flex-direction: column;
    }
  }
`;
