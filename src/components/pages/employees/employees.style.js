import {css, unsafeCSS} from 'lit';
import {responsiveMediaQuery} from '../../../utilities';
import {SCREEN} from '../../../constants';

export const classNames = {
  pageTitle: 'page-title',
  pageActions: 'page-actions',
  footer: 'footer',
  deleteButton: 'delete-button',
  searchBar: 'search-bar',
};

export const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    overflow: auto;
    width: clamp(100%, 100%, 100%);
    height: clamp(100%, 100%, 100%);
  }

  .${unsafeCSS(classNames.footer)} {
    display: flex;
    justify-content: center;
    padding-top: var(--ing-size-spacing-medium);
  }

  .${unsafeCSS(classNames.pageTitle)} {
    display: flex;
    align-items: center;
    gap: var(--ing-size-gap-x-large);
    min-height: 3rem;

    ${responsiveMediaQuery(SCREEN.MOBILE)} {
      width: 100%;
      justify-content: space-between;
    }

    ${responsiveMediaQuery(SCREEN.TABLET)} {
      width: 100%;
    }
  }

  .${unsafeCSS(classNames.pageActions)} {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--ing-size-gap-x-large);

    .${unsafeCSS(classNames.searchBar)} {
      min-width: 200px;
    }

    ${responsiveMediaQuery(SCREEN.MOBILE)} {
      flex-direction: column;
      width: 100%;

      .${unsafeCSS(classNames.searchBar)} {
        width: 100%;
      }
    }
    ${responsiveMediaQuery(SCREEN.TABLET)} {
      width: 100%;

      .${unsafeCSS(classNames.searchBar)} {
        width: 100%;
      }
    }
  }

  ing-confirmation-dialog {
    ul {
      margin: var(--ing-size-spacing-medium);
      padding: var(--ing-size-spacing-medium) 0;
      li {
        padding-bottom: var(--ing-size-spacing-x-small);
      }
    }
  }
`;
