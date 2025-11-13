import {LitElement, html} from 'lit';
import {createRef, ref} from 'lit/directives/ref.js';
import {applyDefaultProps} from '../../../utilities';
import {defaultProps, props} from './dialog.props';
import {styles} from './dialog.style';

import '../surface';

export class IngDialog extends LitElement {
  /** @type {import('lit/directives/ref.js').Ref<HTMLDialogElement>} */
  _dialogRef = createRef();

  /** @type import('lit').CSSResultGroup */
  static styles = [styles];

  /** @type import('lit').PropertyDeclarations */
  static properties = {...props};

  constructor() {
    super();
    applyDefaultProps(this, defaultProps);
  }

  updated(changedProperties) {
    if (changedProperties.has('open')) {
      this.open
        ? this._dialogRef.value.showModal()
        : this._dialogRef.value.close();
    }
  }

  _closeDialog() {
    this.dispatchEvent(new Event('close', {bubbles: true, composed: true}));
  }

  render() {
    return html`
      <dialog
        ${ref(this._dialogRef)}
        @close=${this._closeDialog}
        @click=${(e) => {
          e.target === this._dialogRef.value && this._closeDialog();
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
