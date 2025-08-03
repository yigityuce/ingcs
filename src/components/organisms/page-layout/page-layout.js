import {LitElement, html, css} from 'lit';

export class IngPageLayout extends LitElement {
  /**
   * @type import('lit').PropertyDeclarations
   */
  static get properties() {
    return {
      stretch: {type: Boolean, reflect: true},
    };
  }

  /**
   * @type import('lit').CSSResultGroup
   */
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        gap: var(--ing-size-gap-x-large);
        padding: var(--ing-size-spacing-large) var(--ing-size-spacing-2x-large);
      }

      :host([stretch]) {
        width: clamp(100%, 100%, 100%);
        height: clamp(100%, 100%, 100%);
      }

      ::slotted(:not([slot])) {
        flex-grow: 1;
      }
    `;
  }

  render() {
    return html`
      <slot name="header"></slot>
      <slot></slot>
      <slot name="footer"></slot>
    `;
  }
}

window.customElements.define('ing-page-layout', IngPageLayout);
