import {LitElement, html} from 'lit';
import {iconStyles} from './icon.css';

export class IngIconOutlinedGrid extends LitElement {
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
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
          d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"
        />
      </svg>
    `;
  }
}

window.customElements.define('ing-icon-outlined-grid', IngIconOutlinedGrid);
