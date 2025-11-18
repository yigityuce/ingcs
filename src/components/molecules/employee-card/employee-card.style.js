import {css, unsafeCSS} from 'lit';
import {responsiveMediaQuery, SCREEN} from '../../../utilities';

export const classNames = {
  content: 'content',
  section: 'section',
  actions: 'actions',
  selectedIndicator: 'selected-indicator',
};

export const style = css`
  :host {
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }

  .${unsafeCSS(classNames.content)} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--ing-size-gap-2x-large);
    overflow: visible;
    position: relative;

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

  .${unsafeCSS(classNames.selectedIndicator)} {
    position: absolute;
    top: 0rem;
    right: -1rem;
  }
`;
