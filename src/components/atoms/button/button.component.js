import {LitElement, html} from 'lit';
import {applyDefaultProps} from '../../../utilities';
import {defaultProps, props} from './button.props';
import {classNames, styles} from './button.style';

export class IngButton extends LitElement {
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
      <button type=${this.type}>
        <slot name="prefix"></slot>
        <ing-typography
          variant="body1"
          color="inherit"
          strong
          class=${classNames.content}
        >
          <slot></slot>
        </ing-typography>
        <slot name="suffix"></slot>
      </button>
    `;
  }
}

window.customElements.define('ing-button', IngButton);
