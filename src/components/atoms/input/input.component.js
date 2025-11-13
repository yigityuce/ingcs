import {LitElement, html} from 'lit';
import {choose} from 'lit/directives/choose.js';
import {when} from 'lit/directives/when.js';
import {applyDefaultProps} from '../../../utilities';
import {classNames, styles} from './input.style';
import {defaultProps, props} from './input.props';

export class IngInput extends LitElement {
  static get formAssociated() {
    return true;
  }

  /** @type import('lit').CSSResultGroup */
  static styles = [styles];

  /** @type import('lit').PropertyDeclarations */
  static properties = {...props};

  constructor() {
    super();
    this.internals = this.attachInternals();
    applyDefaultProps(this, defaultProps);
  }

  willUpdate() {
    this.internals.setFormValue(this.value);
  }

  updated() {
    this._manageValidity();
  }

  firstUpdated(...args) {
    super.firstUpdated(...args);
    /** This ensures our element always participates in the form */
    this.internals.setFormValue(this.value);
    this._manageValidity();
  }

  _onInput(event) {
    this.value = event.target.value;
    this.internals.setFormValue(this.value);
  }

  _onChange(event) {
    this._onInput(event);
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: event.target.value,
      })
    );
  }

  _manageValidity() {
    const {value} = this;
    /** @type {HTMLInputElement | HTMLSelectElement} */
    const input = this.shadowRoot.querySelector(`.${classNames.native}`);
    if (value === '' && this.required) {
      this.internals.setValidity(
        {valueMissing: true},
        'This field is required', // TODO: translation
        input
      );
    } else {
      const validity = input.checkValidity();
      if (validity) {
        this.internals.setValidity({});
      } else {
        this.internals.setValidity(
          input.validity,
          input.validationMessage,
          input
        );
      }
    }
  }

  render() {
    return html`<label>
      ${choose(
        this.type,
        [
          [
            'select',
            () => html`
              <select
                class=${classNames.native}
                name=${this.name}
                ?required=${this.required}
                ?disabled=${this.disabled}
                @change=${this._onChange}
              >
                <option value="" disabled ?selected=${!this.value}>
                  ${this.placeholder}
                </option>
                ${this.options.map(
                  (option) => html`
                    <option
                      value=${option.value}
                      ?selected=${option.value === this.value}
                    >
                      ${option.label}
                    </option>
                  `
                )}
              </select>
            `,
          ],
        ],
        () => html`<input
          class=${classNames.native}
          .type=${this.type}
          .name=${this.name}
          .value=${this.value}
          ?required=${this.required}
          ?disabled=${this.disabled}
          .placeholder=${this.placeholder}
          @input=${this._onInput}
          @change=${this._onChange}
        />`
      )}
      ${when(
        this.label,
        () =>
          html`<ing-typography variant="body1" color="inherit">
            ${this.label}${this.required ? '*' : ''}
          </ing-typography>`,
        () => html``
      )}
    </label>`;
  }
}

window.customElements.define('ing-input', IngInput);
