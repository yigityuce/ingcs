import {css} from 'lit';

export const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    gap: var(--ing-size-gap-x-large);
    width: clamp(100%, 100%, 100%);
    height: clamp(100%, 100%, 100%);
  }
`;
