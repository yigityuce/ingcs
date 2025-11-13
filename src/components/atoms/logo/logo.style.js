import {css} from 'lit';

export const styles = css`
  :host {
    height: 3rem;
    width: 3rem;
  }
  :host([size='small']) {
    height: 2rem;
    width: 2rem;
  }
  :host([size='large']) {
    height: 4rem;
    width: 4rem;
  }
`;
