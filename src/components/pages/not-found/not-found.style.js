import {css} from 'lit';

export const classNames = {
  empty: 'empty',
};

export const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    gap: calc(3 * var(--ing-size-gap-2x-large));
  }
`;
