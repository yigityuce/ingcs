import {LitElement, html, css} from 'lit';

export class IngLogo extends LitElement {
  /**
   * @type import('lit').PropertyDeclarations
   */
  static get properties() {
    return {
      size: {type: String, reflect: true},
    };
  }

  /**
   * @type import('lit').CSSResultGroup
   */
  static get styles() {
    return css`
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

      .logo {
        height: 100%;
        width: 100%;
      }
    `;
  }

  constructor() {
    super();
    this.size = 'medium'; // Default size
  }

  render() {
    return html`
      <object
        type="image/svg+xml"
        data="./static/logo.svg"
        class="logo"
      ></object>
    `;
  }
}

window.customElements.define('ing-logo', IngLogo);
