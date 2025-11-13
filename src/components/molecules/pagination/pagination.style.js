import {css, unsafeCSS} from 'lit';

export const classNames = {
  item: 'item',
  active: 'active',
};

export const style = css`
  :host {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--ing-size-gap-medium);
  }

  .${unsafeCSS(classNames.item)} {
    padding: var(--ing-size-spacing-small);

    &.${unsafeCSS(classNames.active)} {
      background-color: var(--ing-color-brand);
      color: var(--ing-color-white);
    }
  }
`;
