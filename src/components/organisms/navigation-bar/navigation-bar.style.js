import {css, unsafeCSS} from 'lit';

export const classNames = {
  brand: 'brand',
  links: 'links',
};

export const styles = css`
  :host {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: var(--ing-size-gap-x-large);
    background-color: var(--ing-color-background-surface);
    padding: var(--ing-size-spacing-small);

    @media screen and (max-width: 600px) {
      flex-direction: column;
    }
  }

  .${unsafeCSS(classNames.brand)} {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-self: flex-start;
    gap: var(--ing-size-gap-x-large);
    cursor: pointer;
  }

  .${unsafeCSS(classNames.links)} {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-self: flex-end;
    gap: var(--ing-size-gap-small);
  }
`;
