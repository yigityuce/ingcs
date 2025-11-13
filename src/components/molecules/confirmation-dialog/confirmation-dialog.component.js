import {LitElement, html} from 'lit';
import {applyDefaultProps, Namespaces, Translatable} from '../../../utilities';
import {classNames, styles} from './confirmation-dialog.style';
import {defaultProps, props} from './confirmation-dialog.props';

import '../../atoms/dialog';
import '../../atoms/typography';
import '../../atoms/button';

export class IngConfirmationDialog extends Translatable(LitElement) {
  /** @type import('lit').PropertyDeclarations */
  static properties = {...props};

  /** @type import('lit').CSSResultGroup */
  static styles = [styles];

  constructor() {
    super();
    applyDefaultProps(this, defaultProps);
  }

  render() {
    return html`
      <ing-dialog ?open=${this.open} size=${this.size}>
        <div slot="header">
          <ing-typography variant="title4" color="secondary" strong>
            <slot name="header"></slot>
          </ing-typography>
        </div>
        <ing-typography variant="body1" color="primary">
          <slot></slot>
        </ing-typography>
        <div slot="footer" class=${classNames.footer}>
          <ing-button
            variant="contained"
            color="primary"
            fullWidth
            @click=${() => {
              this.dispatchEvent(
                new CustomEvent('confirm', {bubbles: true, composed: true})
              );
            }}
          >
            ${this.confirmText ?? this.t('proceed', {ns: Namespaces.COMMON})}
          </ing-button>
          <ing-button
            variant="outlined"
            color="secondary"
            fullWidth
            @click=${() => {
              this.dispatchEvent(
                new CustomEvent('cancel', {bubbles: true, composed: true})
              );
            }}
          >
            ${this.cancelText ?? this.t('cancel', {ns: Namespaces.COMMON})}
          </ing-button>
        </div>
      </ing-dialog>
    `;
  }
}

window.customElements.define('ing-confirmation-dialog', IngConfirmationDialog);
