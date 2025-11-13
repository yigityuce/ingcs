import {css, unsafeCSS} from 'lit';

export const classNames = {
  footer: 'footer',
};

export const styles = css`
  .${unsafeCSS(classNames.footer)} {
    display: flex;
    flex-direction: column;
    gap: var(--ing-size-spacing-x-small);
  }
`;
