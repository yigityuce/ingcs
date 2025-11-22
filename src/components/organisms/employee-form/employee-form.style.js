import {css, unsafeCSS} from 'lit';
import {responsiveMediaQuery} from '../../../utilities';
import {SCREEN} from '../../../constants';

export const classNames = {
  actions: 'actions',
  actionButton: 'action-button',
};

export const styles = css`
  :host {
    width: 100%;
    box-sizing: border-box;
    overflow: auto;
    max-height: 100%;
  }

  form {
    width: 100%;
    box-sizing: border-box;
    display: grid;
    padding: var(--ing-size-spacing-x-large);
    grid-template-columns: repeat(3, 1fr);
    column-gap: calc(3 * var(--ing-size-gap-x-large));
    row-gap: calc(3 * var(--ing-size-gap-x-large));
    align-content: flex-start;

    ${responsiveMediaQuery(SCREEN.MOBILE)} {
      grid-template-columns: repeat(1, 1fr);
      gap: calc(2 * var(--ing-size-gap-x-large));
    }

    ${responsiveMediaQuery(SCREEN.TABLET)} {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .${unsafeCSS(classNames.actions)} {
    grid-column: 1 / -1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: var(--ing-size-spacing-x-large) 0;
    gap: var(--ing-size-gap-x-large);
    width: 50%;
    margin: 0 auto;

    ${responsiveMediaQuery(SCREEN.MOBILE)} {
      flex-direction: column;
      width: 100%;
    }

    ${responsiveMediaQuery(SCREEN.TABLET)} {
      width: 100%;
    }

    .${unsafeCSS(classNames.actionButton)} {
      min-width: 25%;
    }
  }
`;
