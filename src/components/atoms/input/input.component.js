import {LitElement, html} from 'lit';
import {choose} from 'lit/directives/choose.js';
import {when} from 'lit/directives/when.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {classMap} from 'lit/directives/class-map.js';
import {applyDefaultProps, Namespaces, Translatable} from '../../../utilities';
import {VALIDATION_TRIGGER} from '../../../models';
import {classNames, styles} from './input.style';
import {defaultProps, props} from './input.props';

export class IngInput extends Translatable(LitElement) {
  static get formAssociated() {
    return true;
  }

  /** @type import('lit').CSSResultGroup */
  static styles = [styles];

  /** @type import('lit').PropertyDeclarations */
  static properties = {
    ...props,
    _value: {type: String, state: true},
    _touched: {type: Boolean, state: true},
  };

  constructor() {
    super();
    this.internals = this.attachInternals();
    applyDefaultProps(this, defaultProps);
    this.onLanguageChanged(() => {
      !this.internals.validity.valid && this._validate();
    });
  }

  willUpdate() {
    this.internals.setFormValue(this._value);
  }

  firstUpdated(...args) {
    super.firstUpdated(...args);
    this._value = this.initialValue || '';
    this.internals.setFormValue(this._initialValue);
    this._validate();
  }

  _onInput(event) {
    event.stopPropagation();
    this._touched = true;
    this._value = event.target.value;
    if ((this.validationTrigger || []).includes(VALIDATION_TRIGGER.INPUT)) {
      this._validate();
    }
    this.dispatchEvent(
      new CustomEvent('input', {
        detail: event.target.value,
      })
    );
  }

  _onChange(event) {
    event.stopPropagation();
    this._touched = true;
    this._value = event.target.value;
    if ((this.validationTrigger || []).includes(VALIDATION_TRIGGER.CHANGE)) {
      this._validate();
    }
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: event.target.value,
      })
    );
  }

  _onBlur() {
    this._touched = true;
    if ((this.validationTrigger || []).includes(VALIDATION_TRIGGER.BLUR)) {
      this._validate();
    }
  }

  /** @param {ValidityState} state */
  _validationMessage(state) {
    if (state.valueMissing) {
      return this.t('errorMessages.requiredField', {ns: Namespaces.COMMON});
    } else if (state.typeMismatch) {
      return this.t(
        this.type === 'email'
          ? 'errorMessages.invalidEmail'
          : 'errorMessages.typeMismatch',
        {ns: Namespaces.COMMON}
      );
    } else if (state.patternMismatch) {
      return this.t('errorMessages.patternMismatch', {ns: Namespaces.COMMON});
    } else if (state.tooShort) {
      return this.t('errorMessages.tooShort', {
        ns: Namespaces.COMMON,
        minLength: this.minlength,
      });
    } else if (state.tooLong) {
      return this.t('errorMessages.tooLong', {
        ns: Namespaces.COMMON,
        maxLength: this.maxlength,
      });
    } else if (state.rangeUnderflow) {
      return this.t('errorMessages.rangeUnderflow', {
        ns: Namespaces.COMMON,
        min: this.min,
      });
    } else if (state.rangeOverflow) {
      return this.t('errorMessages.rangeOverflow', {
        ns: Namespaces.COMMON,
        max: this.max,
      });
    } else if (state.stepMismatch) {
      return this.t('errorMessages.stepMismatch', {ns: Namespaces.COMMON});
    }
  }

  _validate() {
    /** @type {HTMLInputElement | HTMLSelectElement} */
    const input = this.shadowRoot.querySelector(`.${classNames.native}`);

    if (this._touched) {
      if (this.customValidator) {
        const result = this.customValidator(input, this.internals.form);
        if (result) {
          this.internals.setValidity({customError: true}, result, input);
          return;
        }
      }

      const validity =
        this._value === '' && this.required
          ? {valueMissing: true}
          : input.validity;

      if (validity.valid) {
        this.internals.setValidity({});
      } else {
        this.internals.setValidity(
          input.validity,
          this._validationMessage(validity),
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
                class=${classMap({
                  [classNames.native]: true,
                  [classNames.invalid]: !this.internals.validity.valid,
                })}
                name=${this.name}
                ?required=${this.required}
                ?disabled=${this.disabled}
                @change=${this._onChange}
                @blur=${this._onBlur}
              >
                <option value="" disabled ?selected=${!this._value}>
                  ${this.placeholder}
                </option>
                ${this.options.map(
                  (option) => html`
                    <option
                      value=${option.value}
                      ?selected=${option.value === this._value}
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
          class=${classMap({
            [classNames.native]: true,
            [classNames.invalid]: !this.internals.validity.valid,
          })}
          .type=${this.type}
          .name=${this.name}
          .value=${this._value}
          ?required=${this.required}
          ?disabled=${this.disabled}
          .placeholder=${this.placeholder}
          minlength=${ifDefined(this.minlength)}
          maxlength=${ifDefined(this.maxlength)}
          min=${ifDefined(this.min)}
          max=${ifDefined(this.max)}
          pattern=${ifDefined(this.pattern)}
          step=${ifDefined(this.step)}
          @input=${this._onInput}
          @change=${this._onChange}
          @blur=${this._onBlur}
        />`
      )}
      ${when(
        this.label,
        () =>
          html`<ing-typography
            variant="body1"
            color="inherit"
            class=${classNames.label}
          >
            ${this.label}${this.required ? '*' : ''}
          </ing-typography>`,
        () => html``
      )}
      <ing-typography
        variant="body2"
        color="inherit"
        class=${classNames.assistiveText}
      >
        ${when(
          this.internals.validity.valid,
          () => html`<slot name="assistive-text"></slot>`,
          () => html`${this.internals.validationMessage}`
        )}
      </ing-typography>
    </label>`;
  }
}

window.customElements.define('ing-input', IngInput);
