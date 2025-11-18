import {css, unsafeCSS} from 'lit';

export const classNames = {
  header: 'header',
  footer: 'footer',
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

  .${unsafeCSS(classNames.header)} {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--ing-size-gap-medium);
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
