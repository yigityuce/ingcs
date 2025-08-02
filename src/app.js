import {LitElement, html, css} from 'lit';

export class IngApp extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        box-sizing: border-box;
        flex-direction: column;
        padding: 16px;
        width: clamp(100%, 100%, 100%);
        height: clamp(100%, 100%, 100%);
        overflow: auto;
      }
    `;
  }

  static get properties() {
    return {
      prop1: {type: String},
    };
  }

  constructor() {
    super();
    this.prop1 = 'Hello World';
  }

  render() {
    return html` <h1>${this.prop1}!</h1> `;
  }
}

window.customElements.define('ing-app', IngApp);
