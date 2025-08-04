import {LitElement, html, css} from 'lit';
import {live} from 'lit/directives/live.js';
import {createRef, ref} from 'lit/directives/ref.js';
import {format, parse} from 'date-fns';
import {Namespaces, translate} from '../../../utilities';
import {Translatable} from '../../../mixins';

import '../../atoms/typography';
import '../../atoms/icon-button';
import '../../atoms/icons';
import '../../atoms/surface';
import '../../atoms/input';
import '../../atoms/button';

export class IngEmployeeAddEditForm extends Translatable(LitElement) {
  /**
   * @type {import('lit/directives/ref.js').Ref<HTMLFormElement>}
   */
  _formRef = createRef();

  /**
   * @type import('lit').PropertyDeclarations
   */
  static get properties() {
    return {
      employee: {type: Object, attribute: false},
    };
  }

  /**
   * @type import('lit').CSSResultGroup
   */
  static get styles() {
    return css`
      :host {
        width: 100%;
        box-sizing: border-box;
        overflow: auto;
        max-height: 100%;
      }

      .employee-form {
        width: 100%;
        box-sizing: border-box;
        display: grid;
        padding: var(--ing-size-spacing-x-large);
        grid-template-columns: repeat(3, 1fr);
        column-gap: calc(3 * var(--ing-size-gap-x-large));
        row-gap: calc(3 * var(--ing-size-gap-x-large));
        align-content: flex-start;
      }

      .form-actions {
        grid-column: 1 / -1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--ing-size-spacing-x-large);
        gap: var(--ing-size-gap-x-large);
      }

      .action-button {
        min-width: 25%;
      }
    `;
  }

  _submitForm() {
    /**
     * @type {HTMLFormElement}
     */
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
        class="employee-form"
        ${ref(this._formRef)}
        @submit=${(event) => {
          event.preventDefault();
        }}
      >
        <ing-input
          name="firstName"
          type="text"
          label=${translate('fields.firstName.label', {
            ns: Namespaces.EMPLOYEE,
          })}
          .value=${live(this.employee?.firstName ?? '')}
          placeholder=${translate('fields.firstName.placeholder', {
            ns: Namespaces.EMPLOYEE,
          })}
          required
        >
        </ing-input>
        <ing-input
          name="lastName"
          type="text"
          label=${translate('fields.lastName.label', {
            ns: Namespaces.EMPLOYEE,
          })}
          .value=${live(this.employee?.lastName ?? '')}
          placeholder=${translate('fields.lastName.placeholder', {
            ns: Namespaces.EMPLOYEE,
          })}
          required
        >
        </ing-input>
        <ing-input
          name="dateOfEmployment"
          type="date"
          label=${translate('fields.dateOfEmployment.label', {
            ns: Namespaces.EMPLOYEE,
          })}
          .value=${format(
            new Date(this.employee?.dateOfEmployment || Date.now()),
            'yyyy-MM-dd'
          )}
          placeholder=${translate('fields.dateOfEmployment.placeholder', {
            ns: Namespaces.EMPLOYEE,
          })}
          required
        >
        </ing-input>
        <ing-input
          name="dateOfBirth"
          type="date"
          label=${translate('fields.dateOfBirth.label', {
            ns: Namespaces.EMPLOYEE,
          })}
          .value=${format(
            new Date(this.employee?.dateOfBirth || Date.now()),
            'yyyy-MM-dd'
          )}
          placeholder=${translate('fields.dateOfBirth.placeholder', {
            ns: Namespaces.EMPLOYEE,
          })}
          required
        >
        </ing-input>
        <ing-input
          name="phoneNumber"
          type="text"
          label=${translate('fields.phone.label', {
            ns: Namespaces.EMPLOYEE,
          })}
          .value=${this.employee?.phoneNumber ?? ''}
          placeholder=${translate('fields.phone.placeholder', {
            ns: Namespaces.EMPLOYEE,
          })}
          required
        >
        </ing-input>
        <ing-input
          name="email"
          type="email"
          label=${translate('fields.email.label', {
            ns: Namespaces.EMPLOYEE,
          })}
          .value=${live(this.employee?.email ?? '')}
          placeholder=${translate('fields.email.placeholder', {
            ns: Namespaces.EMPLOYEE,
          })}
          required
        >
        </ing-input>
        <ing-input
          name="department"
          type="select"
          label=${translate('fields.department.label', {
            ns: Namespaces.EMPLOYEE,
          })}
          .value=${live(this.employee?.department)}
          placeholder=${translate('fields.department.placeholder', {
            ns: Namespaces.EMPLOYEE,
          })}
          required
          .options=${[
            {
              value: 'Analytics',
              label: html`${translate('fields.department.analytics', {
                ns: Namespaces.EMPLOYEE,
              })}`,
            },
            {
              value: 'Tech',
              label: html`${translate('fields.department.tech', {
                ns: Namespaces.EMPLOYEE,
              })}`,
            },
          ]}
        >
        </ing-input>
        <ing-input
          name="position"
          type="select"
          label=${translate('fields.position.label', {
            ns: Namespaces.EMPLOYEE,
          })}
          .value=${live(this.employee?.position)}
          placeholder=${translate('fields.position.placeholder', {
            ns: Namespaces.EMPLOYEE,
          })}
          required
          .options=${[
            {
              value: 'Junior',
              label: html`${translate('fields.position.junior', {
                ns: Namespaces.EMPLOYEE,
              })}`,
            },
            {
              value: 'Medior',
              label: html`${translate('fields.position.medior', {
                ns: Namespaces.EMPLOYEE,
              })}`,
            },
            {
              value: 'Senior',
              label: html`${translate('fields.position.senior', {
                ns: Namespaces.EMPLOYEE,
              })}`,
            },
          ]}
        >
        </ing-input>
        <div class="form-actions">
          <ing-button
            variant="contained"
            color="primary"
            class="action-button"
            @click=${this._submitForm}
          >
            ${translate('save', {ns: Namespaces.COMMON})}
          </ing-button>
          <ing-button
            variant="outlined"
            color="secondary"
            class="action-button"
            @click=${() => {
              this.dispatchEvent(
                new CustomEvent('cancel', {
                  bubbles: true,
                  composed: true,
                })
              );
            }}
          >
            ${translate('cancel', {ns: Namespaces.COMMON})}
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
