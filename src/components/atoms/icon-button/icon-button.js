import {LitElement, html, css} from 'lit';

export class IngIconButton extends LitElement {
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
        display: inline-flex;
        padding: var(--ing-size-spacing-small);
        box-sizing: border-box;
        border-radius: 50%;
        cursor: pointer;
      }
      :host(:hover) {
        background-color: var(--ing-color-grey-100);
      }
    `;
  }

  render() {
    return html` <slot></slot> `;
  }
}

window.customElements.define('ing-icon-button', IngIconButton);
