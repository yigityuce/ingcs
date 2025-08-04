import {LitElement, html, css} from 'lit';
import {createRef, ref} from 'lit/directives/ref.js';

import '../surface';

export class IngDialog extends LitElement {
  /**
   * @type {import('lit/directives/ref.js').Ref<HTMLDialogElement>}
   */
  _dialogRef = createRef();

  /**
   * @type import('lit').PropertyDeclarations
   */
  static get properties() {
    return {
      open: {type: Boolean, reflect: true},
      size: {type: String, reflect: true}, // small, medium, large, auto
    };
  }

  /**
   * @type import('lit').CSSResultGroup
   */
  static get styles() {
    return css`
      :host {
        display: contents;
      }
      :host([size='small']) dialog {
        width: 25%;
      }
      :host([size='medium']) dialog {
        width: 50%;
      }
      :host([size='large']) dialog {
        width: 75%;
      }
      :host([size='auto']) dialog {
        width: fit-content;
      }
      dialog {
        border: none;
        background-color: transparent;
        padding: 0;
      }

      dialog:focus-visible {
        outline: none;
      }
      dialog::backdrop {
        background-color: rgba(0, 0, 0, 0.5);
      }
    `;
  }

  constructor() {
    super();
    this.open = false;
    this.size = 'medium'; // Default size
  }

  updated(changedProperties) {
    if (changedProperties.has('open')) {
      this.open
        ? this._dialogRef.value.showModal()
        : this._dialogRef.value.close();
    }
  }

  _closeDialog() {
    this.dispatchEvent(new Event('close'));
  }

  render() {
    return html`
      <dialog
        ${ref(this._dialogRef)}
        @close=${this._closeDialog}
        @click=${(e) => {
          if (e.target === this._dialogRef.value) {
            this._closeDialog();
          }
        }}
      >
        <ing-surface
          withBackground
          withBorderRadius
          paddingSize="large"
          gapSize="x-large"
        >
          <div slot="header">
            <slot name="header"></slot>
          </div>
          <slot></slot>
          <div slot="footer">
            <slot name="footer"></slot>
          </div>
        </ing-surface>
      </dialog>
    `;
  }
}

window.customElements.define('ing-dialog', IngDialog);
