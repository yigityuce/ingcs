import {css} from 'lit';

export const styles = css`
  :host {
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    width: clamp(100%, 100%, 100%);
    height: clamp(100%, 100%, 100%);
    overflow: hidden;
    background-color: var(--ing-color-background-default);
  }
  main {
    flex-grow: 1;
    overflow: hidden;
    max-height: 100%;
    max-width: 100%;
  }
`;
