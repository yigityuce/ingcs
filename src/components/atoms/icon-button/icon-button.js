import {LitElement, html, css} from 'lit';

export class IngIconButton extends LitElement {
  /**
   * @type import('lit').PropertyDeclarations
   */
  static get properties() {
    return {
      disabled: {type: Boolean, reflect: true},
    };
  }

  /**
   * @type import('lit').CSSResultGroup
   */
  static get styles() {
    return css`
      :host {
        display: inline-flex;
        padding: var(--ing-size-spacing-x-small);
        box-sizing: border-box;
        border-radius: 50%;
        cursor: pointer;
        aspect-ratio: 1 / 1;
        height: 100%;
        width: auto;
        align-items: center;
        justify-content: center;
      }
      :host([disabled]) {
        cursor: default;
        pointer-events: none;
      }
      :host(:not([disabled]):hover) {
        background-color: var(--ing-color-grey-200);
      }
    `;
  }

  render() {
    return html` <slot></slot> `;
  }
}

window.customElements.define('ing-icon-button', IngIconButton);
