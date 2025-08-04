import {LitElement, html, css} from 'lit';

export class IngButton extends LitElement {
  /**
   * @type import('lit').PropertyDeclarations
   */
  static get properties() {
    return {
      type: {type: String, reflect: true}, // e.g., 'button', 'submit', 'reset'
      variant: {type: String, reflect: true}, // e.g., 'outlined', 'contained', 'text',
      color: {type: String, reflect: true}, // e.g., 'primary', 'secondary',
      fullWidth: {type: Boolean, reflect: true},
    };
  }

  /**
   * @type import('lit').CSSResultGroup
   */
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: fit-content;
        height: fit-content;
        min-height: 2rem;
        cursor: pointer;
        white-space: nowrap;
        gap: var(--ing-size-gap-medium);
        border-radius: var(--ing-size-radius-small);
        position: relative;
      }

      :host([fullWidth]) {
        width: 100%;
      }

      button {
        all: unset;
        display: flex;
        background-color: inherit;
        color: inherit;
        align-items: inherit;
        justify-content: inherit;
        gap: inherit;
        border: inherit;
        border-radius: inherit;
        cursor: inherit;
        white-space: inherit;
        height: 100%;
        width: 100%;
        padding: var(--ing-size-spacing-small);
      }

      :host([variant='contained'][color='primary']) {
        background-color: var(--ing-color-brand);
        color: var(--ing-color-white);
      }
      :host([variant='contained'][color='secondary']) {
        background-color: var(--ing-color-brand-alt);
        color: var(--ing-color-white);
      }

      :host([variant='outlined'][color='primary']) {
        outline: 1px solid var(--ing-color-brand);
        outline-offset: -1px;
        color: var(--ing-color-brand);
        background-color: transparent;
      }
      :host([variant='outlined'][color='secondary']) {
        outline: 1px solid var(--ing-color-brand-alt);
        outline-offset: -1px;
        color: var(--ing-color-brand-alt);
        background-color: transparent;
      }

      :host([variant='text'][color='primary']) {
        color: var(--ing-color-brand);
        background-color: transparent;
      }
      :host([variant='text'][color='secondary']) {
        color: var(--ing-color-brand-alt);
        background-color: transparent;
      }

      :host(:hover)::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.05);
        border-radius: inherit;
      }
    `;
  }

  constructor() {
    super();
    this.type = 'button'; // Default type
    this.variant = 'contained'; // Default variant
    this.color = 'primary'; // Default color
  }

  render() {
    return html`
      <button type=${this.type}>
        <slot name="prefix"></slot>
        <ing-typography
          variant="body1"
          color="inherit"
          strong
          style="z-index: 2;"
        >
          <slot></slot>
        </ing-typography>
        <slot name="suffix"></slot>
      </button>
    `;
  }
}

window.customElements.define('ing-button', IngButton);
