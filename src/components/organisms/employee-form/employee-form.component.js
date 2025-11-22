import {LitElement, html} from 'lit';
import {format, intervalToDuration, isBefore, isFuture} from 'date-fns';
import {maskitoPhoneOptionsGenerator} from '@maskito/phone';
import metadata from 'libphonenumber-js/min/metadata';
import {isValidPhoneNumber} from 'libphonenumber-js';
import {live} from 'lit/directives/live.js';
import {createRef, ref} from 'lit/directives/ref.js';
import {DEPARTMENT, POSITION} from '../../../models';
import {MIN_AGE} from '../../../constants';
import {
  applyDefaultProps,
  formatPhoneNumber,
  Namespaces,
  parseDate,
  StoreConnector,
  Translatable,
} from '../../../utilities';
import {defaultProps, props} from './employee-form.props';
import {classNames, styles} from './employee-form.style';

import '../../atoms/typography';
import '../../atoms/icon-button';
import '../../atoms/icon';
import '../../atoms/surface';
import '../../atoms/input';
import '../../atoms/button';

export class IngEmployeeAddEditForm extends StoreConnector(
  Translatable(LitElement)
) {
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
    const form = this._formRef.value;

    if (form.reportValidity()) {
      const formData = new FormData(form);
      const data = {};
      for (const key of formData.keys()) {
        data[key] = formData.get(key);
      }
      data.dateOfBirth = parseDate(data.dateOfBirth);
      data.dateOfEmployment = parseDate(data.dateOfEmployment);
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
          required
          label=${this.t('fields.firstName.label', {
            ns: Namespaces.EMPLOYEE,
          })}
          placeholder=${this.t('fields.firstName.placeholder', {
            ns: Namespaces.EMPLOYEE,
          })}
          .initialValue=${live(this.employee?.firstName ?? '')}
        >
          <span slot="assistive-text">
            ${this.t('fields.firstName.assistiveText', {
              ns: Namespaces.EMPLOYEE,
            })}
          </span>
        </ing-input>

        <ing-input
          name="lastName"
          type="text"
          required
          label=${this.t('fields.lastName.label', {
            ns: Namespaces.EMPLOYEE,
          })}
          placeholder=${this.t('fields.lastName.placeholder', {
            ns: Namespaces.EMPLOYEE,
          })}
          .initialValue=${live(this.employee?.lastName ?? '')}
        >
          <span slot="assistive-text">
            ${this.t('fields.lastName.assistiveText', {
              ns: Namespaces.EMPLOYEE,
            })}
          </span>
        </ing-input>

        <ing-input
          name="dateOfBirth"
          type="date"
          required
          label=${this.t('fields.dateOfBirth.label', {
            ns: Namespaces.EMPLOYEE,
          })}
          placeholder=${this.t('fields.dateOfBirth.placeholder', {
            ns: Namespaces.EMPLOYEE,
          })}
          .initialValue=${this.employee?.dateOfBirth
            ? format(new Date(this.employee?.dateOfBirth), 'yyyy-MM-dd')
            : undefined}
          .customValidator=${(input) => {
            const value = parseDate(input.value);
            const duration = intervalToDuration({
              start: value,
              end: new Date(),
            });
            if (duration.years < MIN_AGE) {
              return this.t('errorMessages.ageRestriction', {
                ns: Namespaces.COMMON,
                minAge: MIN_AGE,
              });
            }
          }}
        >
          <span slot="assistive-text">
            ${this.t('fields.dateOfBirth.assistiveText', {
              ns: Namespaces.EMPLOYEE,
            })}
          </span>
        </ing-input>

        <ing-input
          name="dateOfEmployment"
          type="date"
          required
          label=${this.t('fields.dateOfEmployment.label', {
            ns: Namespaces.EMPLOYEE,
          })}
          placeholder=${this.t('fields.dateOfEmployment.placeholder', {
            ns: Namespaces.EMPLOYEE,
          })}
          .initialValue=${format(
            new Date(this.employee?.dateOfEmployment || Date.now()),
            'yyyy-MM-dd'
          )}
          .customValidator=${(input, form) => {
            const value = parseDate(input.value);
            const formData = new FormData(form);
            const dob = formData.get('dateOfBirth')
              ? parseDate(formData.get('dateOfBirth'))
              : null;

            if (isFuture(value)) {
              return this.t('errorMessages.employmentDateInFuture', {
                ns: Namespaces.COMMON,
              });
            }
            if (dob && isBefore(value, dob)) {
              return this.t('errorMessages.employmentDateBeforeDOB', {
                ns: Namespaces.COMMON,
              });
            }
          }}
        >
          <span slot="assistive-text">
            ${this.t('fields.dateOfEmployment.assistiveText', {
              ns: Namespaces.EMPLOYEE,
            })}
          </span>
        </ing-input>

        <ing-input
          name="phoneNumber"
          type="text"
          required
          label=${this.t('fields.phone.label', {
            ns: Namespaces.EMPLOYEE,
          })}
          placeholder=${this.t('fields.phone.placeholder', {
            ns: Namespaces.EMPLOYEE,
          })}
          .initialValue=${formatPhoneNumber(this.employee?.phoneNumber ?? '')}
          .maskOptions=${maskitoPhoneOptionsGenerator({
            metadata,
            separator: ' ',
          })}
          .customValidator=${(input) => {
            if (
              this.state.employees.some(
                (emp) =>
                  emp.phoneNumber === input.value &&
                  emp.phoneNumber !== this.employee?.phoneNumber
              )
            ) {
              return this.t('errorMessages.phoneAlreadyExists', {
                ns: Namespaces.COMMON,
              });
            }

            if (!isValidPhoneNumber(input.value)) {
              return this.t('errorMessages.invalidPhone', {
                ns: Namespaces.COMMON,
              });
            }
          }}
        >
          <span slot="assistive-text">
            ${this.t('fields.phone.assistiveText', {
              ns: Namespaces.EMPLOYEE,
            })}
          </span>
        </ing-input>

        <ing-input
          name="email"
          type="email"
          required
          label=${this.t('fields.email.label', {
            ns: Namespaces.EMPLOYEE,
          })}
          placeholder=${this.t('fields.email.placeholder', {
            ns: Namespaces.EMPLOYEE,
          })}
          .initialValue=${live(this.employee?.email ?? '')}
          .customValidator=${(input) => {
            if (
              this.state.employees.some(
                (emp) =>
                  emp.email === input.value &&
                  emp.email !== this.employee?.email
              )
            ) {
              return this.t('errorMessages.emailAlreadyExists', {
                ns: Namespaces.COMMON,
              });
            }
          }}
        >
          <span slot="assistive-text">
            ${this.t('fields.email.assistiveText', {
              ns: Namespaces.EMPLOYEE,
            })}
          </span>
        </ing-input>

        <ing-input
          name="department"
          type="select"
          label=${this.t('fields.department.label', {
            ns: Namespaces.EMPLOYEE,
          })}
          .initialValue=${live(this.employee?.department)}
          placeholder=${this.t('fields.department.placeholder', {
            ns: Namespaces.EMPLOYEE,
          })}
          required
          .options=${[
            {
              value: DEPARTMENT.ANALYTICS,
              label: html`${this.t('fields.department.analytics', {
                ns: Namespaces.EMPLOYEE,
              })}`,
            },
            {
              value: DEPARTMENT.TECH,
              label: html`${this.t('fields.department.tech', {
                ns: Namespaces.EMPLOYEE,
              })}`,
            },
          ]}
        >
          <span slot="assistive-text">
            ${this.t('fields.department.assistiveText', {
              ns: Namespaces.EMPLOYEE,
            })}
          </span>
        </ing-input>

        <ing-input
          name="position"
          type="select"
          label=${this.t('fields.position.label', {
            ns: Namespaces.EMPLOYEE,
          })}
          .initialValue=${live(this.employee?.position)}
          placeholder=${this.t('fields.position.placeholder', {
            ns: Namespaces.EMPLOYEE,
          })}
          required
          .options=${[
            {
              value: POSITION.JR,
              label: html`${this.t('fields.position.junior', {
                ns: Namespaces.EMPLOYEE,
              })}`,
            },
            {
              value: POSITION.MID,
              label: html`${this.t('fields.position.medior', {
                ns: Namespaces.EMPLOYEE,
              })}`,
            },
            {
              value: POSITION.SR,
              label: html`${this.t('fields.position.senior', {
                ns: Namespaces.EMPLOYEE,
              })}`,
            },
          ]}
        >
          <span slot="assistive-text">
            ${this.t('fields.position.assistiveText', {
              ns: Namespaces.EMPLOYEE,
            })}
          </span>
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

window.customElements.define('ing-employee-form', IngEmployeeAddEditForm);
