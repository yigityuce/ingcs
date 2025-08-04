import {LitElement, html, css} from 'lit';
import {choose} from 'lit/directives/choose.js';
import {when} from 'lit/directives/when.js';

export class IngInput extends LitElement {
  static get formAssociated() {
    return true;
  }

  /**
   * @type import('lit').PropertyDeclarations
   */
  static get properties() {
    return {
      disabled: {type: Boolean, reflect: true},
      required: {type: Boolean, reflect: true},
      type: {type: String, reflect: true}, // e.g., 'text', 'password', 'date', 'email',
      name: {type: String, reflect: true},
      value: {type: String},
      label: {type: String, reflect: true},
      placeholder: {type: String, reflect: true},
      form: {type: String, reflect: true},
      options: {type: Array, attribute: false}, // Array<{ value: string, label: TemplateResult<1> }>
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
      }
      :host([disabled]) {
        cursor: default;
        pointer-events: none;
      }

      label {
        display: flex;
        flex-direction: column-reverse;
        gap: var(--ing-size-gap-medium);
        color: var(--ing-color-text-primary);
      }

      .input-element {
        width: 100%;
        box-sizing: border-box;
        padding: var(--ing-size-spacing-small);
        border: none;
        outline: 1px solid var(--ing-color-grey-500);
        border-radius: var(--ing-size-radius-small);
        font-size: 1rem;
        color: var(--ing-color-text-primary);
        min-height: 3rem;
        --default-icon-color: var(--ing-color-grey-800);
      }

      .input-element:focus {
        outline-color: var(--ing-color-brand);
      }

      .input-element:user-invalid {
        outline-color: var(--ing-color-error-dark);
        outline-width: 2px;
      }

      .input-element:focus + ing-typography {
        color: var(--ing-color-brand);
      }

      .input-element:user-invalid + ing-typography {
        color: var(--ing-color-error-dark);
      }

      select {
        appearance: none;
        cursor: pointer;
        background-image: url('data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9L12 15L18 9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"/></svg>');
        background-repeat: no-repeat;
        background-position: right 0.75rem center;
        background-size: 1.25rem;
      }

      input[type='date']::-webkit-calendar-picker-indicator {
        appearance: none;
        cursor: pointer;
        background-repeat: no-repeat;
        background-position: right center;
        background-size: 1.25rem 1.25rem;
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><g><rect fill="none" height="24" width="24"/></g><g><path d="M19,4h-1V2h-2v2H8V2H6v2H5C3.89,4,3.01,4.9,3.01,6L3,20c0,1.1,0.89,2,2,2h14c1.1,0,2-0.9,2-2V6C21,4.9,20.1,4,19,4z M19,20 H5V10h14V20z M9,14H7v-2h2V14z M13,14h-2v-2h2V14z M17,14h-2v-2h2V14z M9,18H7v-2h2V18z M13,18h-2v-2h2V18z M17,18h-2v-2h2V18z"/></g></svg>');
      }
    `;
  }

  constructor() {
    super();
    this.internals = this.attachInternals();
    this.name = '';
    this.type = 'text';
    this.value = '';
    this.disabled = false;
    this.required = false;
    this.label = '';
    this.placeholder = '';
    this.options = [];
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
    /**
     * @type {HTMLInputElement | HTMLSelectElement}
     */
    const input = this.shadowRoot.querySelector('.input-element');
    if (value === '' && this.required) {
      this.internals.setValidity(
        {valueMissing: true},
        'This field is required',
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
                class="input-element"
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
          class="input-element"
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
