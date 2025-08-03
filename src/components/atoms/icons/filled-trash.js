import {LitElement, html} from 'lit';
import {iconStyles} from './icon.css';

export class IngIconFilledTrash extends LitElement {
  /**
   * @type import('lit').PropertyDeclarations
   */
  static get properties() {
    return {
      color: {type: String, reflect: true}, // color: 'primary', 'secondary', 'error', 'warning', 'success'
      size: {type: String, reflect: true}, // size of the icon, e.g., 'small', 'medium', 'large'
    };
  }

  /**
   * @type import('lit').CSSResultGroup
   */
  static get styles() {
    return [iconStyles];
  }

  constructor() {
    super();
    this.color = 'primary';
    this.size = 'medium';
  }

  render() {
    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="48px"
        viewBox="0 0 24 24"
        width="48px"
        fill="var(--fill-color, #000000)"
        class="icon"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
        />
      </svg>
    `;
  }
}

window.customElements.define('ing-icon-filled-trash', IngIconFilledTrash);
