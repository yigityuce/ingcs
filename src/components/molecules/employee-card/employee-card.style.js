import {css, unsafeCSS} from 'lit';
import {responsiveMediaQuery, SCREEN} from '../../../utilities';

export const classNames = {
  content: 'content',
  section: 'section',
  actions: 'actions',
};

export const style = css`
  :host {
    display: block;
    box-sizing: border-box;
    width: 100%;
    max-width: 600px;
    height: 100%;
  }

  :host(:nth-child(2n)) {
    justify-self: start;
  }

  :host(:nth-child(2n + 1)) {
    justify-self: end;
  }

  .${unsafeCSS(classNames.content)} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--ing-size-gap-2x-large);
    overflow: visible;

    ${responsiveMediaQuery(SCREEN.MOBILE)} {
      grid-template-columns: 1fr;
      column-gap: var(--ing-size-gap-medium);
      row-gap: var(--ing-size-gap-medium);
    }
  }

  .${unsafeCSS(classNames.section)} {
    display: flex;
    flex-direction: column;
    gap: var(--ing-size-gap-small);
  }

  .${unsafeCSS(classNames.actions)} {
    margin-top: var(--ing-size-spacing-medium);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--ing-size-gap-large);

    ${responsiveMediaQuery(SCREEN.MOBILE)} {
      grid-template-columns: 1fr;
    }
  }
`;
