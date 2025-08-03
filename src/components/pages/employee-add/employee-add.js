import {LitElement, html, css} from 'lit';

export class IngEmployeeAdd extends LitElement {
  /**
   * @type import('lit').PropertyDeclarations
   */
  static get properties() {
    return {};
  }

  /**
   * @type import('lit').CSSResultGroup
   */
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 16px;
      }
    `;
  }

  render() {
    return html`
      <h1>Employee Add</h1>
      <p>This is the employees page content.</p>
    `;
  }
}

window.customElements.define('ing-employee-add', IngEmployeeAdd);
