import {css} from 'lit';

export const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: clamp(100%, 100%, 100%);
    height: clamp(100%, 100%, 100%);
    overflow: hidden;
  }
`;
