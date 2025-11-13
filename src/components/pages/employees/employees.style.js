import {css, unsafeCSS} from 'lit';

export const classNames = {
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
`;
