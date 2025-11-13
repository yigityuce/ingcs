import {css} from 'lit';

export const style = css`
  :host {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--ing-size-gap-medium);
  }

  ::slotted([slot='prefix']),
  ::slotted([slot='suffix']) {
    flex-shrink: 1;
  }
  ::slotted(:not([slot])) {
    flex-grow: 1;
  }
`;
