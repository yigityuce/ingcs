import {format, parse} from 'date-fns';
import {LitElement, html} from 'lit';
import {live} from 'lit/directives/live.js';
import {createRef, ref} from 'lit/directives/ref.js';
import {applyDefaultProps, Namespaces, Translatable} from '../../../utilities';
import {defaultProps, props} from './employee-form.props';
import {classNames, styles} from './employee-form.style';

import '../../atoms/typography';
import '../../atoms/icon-button';
import '../../atoms/icon';
import '../../atoms/surface';
import '../../atoms/input';
import '../../atoms/button';

export class IngEmployeeAddEditForm extends Translatable(LitElement) {
  /** @type {import('lit/directives/ref.js').Ref<HTMLFormElement>} */
  _formRef = createRef();

  /** @type import('lit').PropertyDeclarations */
  static properties = {...props};

  /** @type import('lit').CSSResultGroup */
  static styles = [styles];

  constructor() {
    super();
    applyDefaultProps(this, defaultProps);
  }

  _submitForm() {
    /** @type {HTMLFormElement} */
    const form = this._formRef.value;
    const formData = new FormData(form);
    const data = {};
    for (const key of formData.keys()) {
      data[key] = formData.get(key);
    }

    data.dateOfBirth = parse(data.dateOfBirth, 'yyyy-MM-dd', new Date());
    data.dateOfEmployment = parse(
      data.dateOfEmployment,
      'yyyy-MM-dd',
      new Date()
    );

    if (form.reportValidity()) {
      this.dispatchEvent(
        new CustomEvent('submit', {
          detail: data,
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  render() {
    return html`
      <form
        ${ref(this._formRef)}
        @submit=${(event) => {
          event.preventDefault();
        }}
      >
        <ing-input
          name="firstName"
          type="text"
          label=${this.t('fields.firstName.label', {
            ns: Namespaces.EMPLOYEE,
          })}
          .value=${live(this.employee?.firstName ?? '')}
          placeholder=${this.t('fields.firstName.placeholder', {
            ns: Namespaces.EMPLOYEE,
          })}
          required
        >
        </ing-input>
        <ing-input
          name="lastName"
          type="text"
          label=${this.t('fields.lastName.label', {
            ns: Namespaces.EMPLOYEE,
          })}
          .value=${live(this.employee?.lastName ?? '')}
          placeholder=${this.t('fields.lastName.placeholder', {
            ns: Namespaces.EMPLOYEE,
          })}
          required
        >
        </ing-input>
        <ing-input
          name="dateOfEmployment"
          type="date"
          label=${this.t('fields.dateOfEmployment.label', {
            ns: Namespaces.EMPLOYEE,
          })}
          .value=${format(
            new Date(this.employee?.dateOfEmployment || Date.now()),
            'yyyy-MM-dd'
          )}
          placeholder=${this.t('fields.dateOfEmployment.placeholder', {
            ns: Namespaces.EMPLOYEE,
          })}
          required
        >
        </ing-input>
        <ing-input
          name="dateOfBirth"
          type="date"
          label=${this.t('fields.dateOfBirth.label', {
            ns: Namespaces.EMPLOYEE,
          })}
          .value=${format(
            new Date(this.employee?.dateOfBirth || Date.now()),
            'yyyy-MM-dd'
          )}
          placeholder=${this.t('fields.dateOfBirth.placeholder', {
            ns: Namespaces.EMPLOYEE,
          })}
          required
        >
        </ing-input>
        <ing-input
          name="phoneNumber"
          type="text"
          label=${this.t('fields.phone.label', {
            ns: Namespaces.EMPLOYEE,
          })}
          .value=${this.employee?.phoneNumber ?? ''}
          placeholder=${this.t('fields.phone.placeholder', {
            ns: Namespaces.EMPLOYEE,
          })}
          required
        >
        </ing-input>
        <ing-input
          name="email"
          type="email"
          label=${this.t('fields.email.label', {
            ns: Namespaces.EMPLOYEE,
          })}
          .value=${live(this.employee?.email ?? '')}
          placeholder=${this.t('fields.email.placeholder', {
            ns: Namespaces.EMPLOYEE,
          })}
          required
        >
        </ing-input>
        <ing-input
          name="department"
          type="select"
          label=${this.t('fields.department.label', {
            ns: Namespaces.EMPLOYEE,
          })}
          .value=${live(this.employee?.department)}
          placeholder=${this.t('fields.department.placeholder', {
            ns: Namespaces.EMPLOYEE,
          })}
          required
          .options=${[
            {
              value: 'Analytics',
              label: html`${this.t('fields.department.analytics', {
                ns: Namespaces.EMPLOYEE,
              })}`,
            },
            {
              value: 'Tech',
              label: html`${this.t('fields.department.tech', {
                ns: Namespaces.EMPLOYEE,
              })}`,
            },
          ]}
        >
        </ing-input>
        <ing-input
          name="position"
          type="select"
          label=${this.t('fields.position.label', {
            ns: Namespaces.EMPLOYEE,
          })}
          .value=${live(this.employee?.position)}
          placeholder=${this.t('fields.position.placeholder', {
            ns: Namespaces.EMPLOYEE,
          })}
          required
          .options=${[
            {
              value: 'Junior',
              label: html`${this.t('fields.position.junior', {
                ns: Namespaces.EMPLOYEE,
              })}`,
            },
            {
              value: 'Medior',
              label: html`${this.t('fields.position.medior', {
                ns: Namespaces.EMPLOYEE,
              })}`,
            },
            {
              value: 'Senior',
              label: html`${this.t('fields.position.senior', {
                ns: Namespaces.EMPLOYEE,
              })}`,
            },
          ]}
        >
        </ing-input>
        <div class=${classNames.actions}>
          <ing-button
            variant="contained"
            color="primary"
            class=${classNames.actionButton}
            fullWidth
            @click=${this._submitForm}
          >
            ${this.t('save', {ns: Namespaces.COMMON})}
          </ing-button>
          <ing-button
            variant="outlined"
            color="secondary"
            class=${classNames.actionButton}
            fullWidth
            @click=${() => {
              this.dispatchEvent(
                new CustomEvent('cancel', {
                  bubbles: true,
                  composed: true,
                })
              );
            }}
          >
            ${this.t('cancel', {ns: Namespaces.COMMON})}
          </ing-button>
        </div>
      </form>
    `;
  }
}

window.customElements.define(
  'ing-employee-add-edit-form',
  IngEmployeeAddEditForm
);
