import {css} from 'lit';

export const styles = css`
  :host {
    display: inline-flex;
    padding: var(--ing-size-spacing-x-small);
    box-sizing: border-box;
    border-radius: 50%;
    cursor: pointer;
    aspect-ratio: 1 / 1;
    height: 100%;
    width: auto;
    align-items: center;
    justify-content: center;
  }
  :host([disabled]) {
    cursor: default;
    pointer-events: none;
  }
  :host(:not([disabled]):hover) {
    background-color: var(--ing-color-grey-200);
  }
`;
