import {LitElement, html} from 'lit';
import {applyDefaultProps} from '../../../utilities';
import {defaultProps, props} from './checkbox.props';
import {classNames, styles} from './checkbox.style';
import {createRef, ref} from 'lit/directives/ref.js';
import {choose} from 'lit/directives/choose.js';

export class IngCheckbox extends LitElement {
  /** @type {import('lit/directives/ref.js').Ref<HTMLElement>} */
  _inputRef = createRef();

  /** @type import('lit').PropertyDeclarations */
  static properties = {...props};

  /** @type import('lit').CSSResultGroup */
  static styles = [styles];

  constructor() {
    super();
    applyDefaultProps(this, defaultProps);
  }

  _onClick() {
    if (this.disabled) return;
    let newState = this._inputRef.value.checked ? 'unchecked' : 'checked';
    this._inputRef.value.checked = newState === 'checked';
    this.dispatchEvent(new CustomEvent('stateChange', {detail: newState}));
  }

  render() {
    return html`
      <input
        type="checkbox"
        ?disabled=${this.disabled}
        ${ref(this._inputRef)}
      />
      <div class=${classNames.checkbox} @click=${() => this._onClick()}>
        ${choose(this.state, [
          [
            'checked',
            () =>
              html`<ing-icon-outlined-check
                .color=${this.disabled ? 'disabled' : 'secondary'}
                class=${classNames.icon}
              ></ing-icon-outlined-check>`,
          ],
          [
            'indeterminate',
            () =>
              html`<ing-icon-outlined-minus
                .color=${this.disabled ? 'disabled' : 'secondary'}
                class=${classNames.icon}
              ></ing-icon-outlined-minus>`,
          ],
          ['unchecked', () => html``],
        ])}
      </div>
      <ing-typography
        variant="body1"
        color="inherit"
        strong
        class=${classNames.content}
        @click=${() => this._onClick()}
      >
        <slot></slot>
      </ing-typography>
    `;
  }
}

window.customElements.define('ing-checkbox', IngCheckbox);
