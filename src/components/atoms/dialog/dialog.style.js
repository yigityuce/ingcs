import {css} from 'lit';

export const styles = css`
  :host {
    display: contents;
  }
  :host([size='small']) dialog {
    width: 25%;
  }
  :host([size='medium']) dialog {
    width: 50%;
  }
  :host([size='large']) dialog {
    width: 75%;
  }
  :host([size='auto']) dialog {
    width: fit-content;
  }
  dialog {
    border: none;
    background-color: transparent;
    padding: 0;
    min-width: inherit;
  }

  dialog:focus-visible {
    outline: none;
  }
  dialog::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
