import {LitElement, html, css} from 'lit';

export class IngSurface extends LitElement {
  /**
   * @type import('lit').PropertyDeclarations
   */
  static get properties() {
    return {
      gapSize: {type: String, reflect: true}, // type: 'x-small', 'small', 'medium', 'large', 'x-large'
      paddingSize: {type: String, reflect: true}, // type: 'x-small', 'small', 'medium', 'large', 'x-large'
      withBorderRadius: {type: Boolean, reflect: true},
      withBackground: {type: Boolean, reflect: true},
      footerSeparator: {type: Boolean, reflect: true},
      headerSeparator: {type: Boolean, reflect: true},
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
        width: clamp(100%, 100%, 100%);
        height: clamp(100%, 100%, 100%);
        overflow: hidden;
      }
      ::slotted(:not([slot])) {
        flex-grow: 1;
        overflow: auto;
        max-height: 100%;
      }

      /** PADDING SIZES */
      :host([paddingSize='x-small']) {
        padding: var(--ing-size-spacing-x-small) var(--ing-size-spacing-small);
      }
      :host([paddingSize='small']) {
        padding: var(--ing-size-spacing-small) var(--ing-size-spacing-medium);
      }
      :host([paddingSize='medium']) {
        padding: var(--ing-size-spacing-medium) var(--ing-size-spacing-large);
      }
      :host([paddingSize='large']) {
        padding: var(--ing-size-spacing-large) var(--ing-size-spacing-x-large);
      }
      :host([paddingSize='x-large']) {
        padding: var(--ing-size-spacing-x-large)
          var(--ing-size-spacing-2x-large);
      }

      /** GAP SIZES */
      :host([gapSize='x-small']) {
        gap: var(--ing-size-gap-x-small);
      }
      :host([gapSize='small']) {
        gap: var(--ing-size-gap-small);
      }
      :host([gapSize='medium']) {
        gap: var(--ing-size-gap-medium);
      }
      :host([gapSize='large']) {
        gap: var(--ing-size-gap-large);
      }
      :host([gapSize='x-large']) {
        gap: var(--ing-size-gap-x-large);
      }

      /** SEPARATOR */
      :host([footerSeparator]) ::slotted([slot='footer']) {
        border-top: 1px solid var(--ing-color-grey-300);
      }
      :host([headerSeparator]) ::slotted([slot='header']) {
        border-bottom: 1px solid var(--ing-color-grey-300);
      }

      /** BORDER RADIUS */
      :host([withBorderRadius]) {
        border-radius: var(--ing-size-radius-medium);
      }

      /** BACKGROUND */
      :host([withBackground]) {
        background-color: var(--ing-color-background-surface);
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

window.customElements.define('ing-surface', IngSurface);
