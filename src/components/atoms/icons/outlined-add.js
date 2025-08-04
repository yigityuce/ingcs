import {LitElement, html} from 'lit';
import {iconStyles} from './icon.css';

export class IngIconOutlinedAdd extends LitElement {
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
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
      </svg>
    `;
  }
}

window.customElements.define('ing-icon-outlined-add', IngIconOutlinedAdd);
