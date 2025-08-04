import {LitElement, html, css} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';
import {maskitoTransform} from '@maskito/core';
import {Translatable} from '../../../mixins';
import {
  formatDate,
  MASK_PHONE,
  Namespaces,
  translate,
} from '../../../utilities';

import '../../atoms/typography';
import '../../atoms/surface';
import '../../atoms/button';
import '../../atoms/icons';

export class IngEmployeeCard extends Translatable(LitElement) {
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
        display: block;
        box-sizing: border-box;
        width: 100%;
        max-width: 600px;
        height: 100%;
      }

      :host(:nth-child(2n)) {
        justify-self: start;
      }

      :host(:nth-child(2n + 1)) {
        justify-self: end;
      }

      .content {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--ing-size-gap-2x-large);
        overflow: visible;
      }

      .section {
        display: flex;
        flex-direction: column;
        gap: var(--ing-size-gap-small);
      }

      .actions {
        margin-top: var(--ing-size-spacing-medium);
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--ing-size-gap-large);
      }
    `;
  }

  render() {
    return html`
      <ing-surface
        withBorderRadius
        withBackground
        paddingSize="medium"
        gapSize="medium"
      >
        <div class="content">
          <div class="section">
            <ing-typography color="disabled" variant="body2">
              ${translate('fields.firstName.label', {ns: Namespaces.EMPLOYEE})}
            </ing-typography>
            <ing-typography color="primary" strong>
              ${ifDefined(this.employee?.firstName)}
            </ing-typography>
          </div>

          <div class="section">
            <ing-typography color="disabled" variant="body2">
              ${translate('fields.lastName.label', {ns: Namespaces.EMPLOYEE})}
            </ing-typography>
            <ing-typography color="primary" strong>
              ${ifDefined(this.employee?.lastName)}
            </ing-typography>
          </div>

          <div class="section">
            <ing-typography color="disabled" variant="body2">
              ${translate('fields.dateOfEmployment.label', {
                ns: Namespaces.EMPLOYEE,
              })}
            </ing-typography>
            <ing-typography color="primary" strong>
              ${formatDate(
                typeof this.employee.dateOfEmployment === 'string'
                  ? new Date(this.employee.dateOfEmployment)
                  : this.employee.dateOfEmployment
              )}
            </ing-typography>
          </div>

          <div class="section">
            <ing-typography color="disabled" variant="body2">
              ${translate('fields.dateOfBirth.label', {
                ns: Namespaces.EMPLOYEE,
              })}
            </ing-typography>
            <ing-typography color="primary" strong>
              ${formatDate(
                typeof this.employee.dateOfBirth === 'string'
                  ? new Date(this.employee.dateOfBirth)
                  : this.employee.dateOfBirth
              )}
            </ing-typography>
          </div>

          <div class="section">
            <ing-typography color="disabled" variant="body2">
              ${translate('fields.phone.label', {
                ns: Namespaces.EMPLOYEE,
              })}
            </ing-typography>
            <ing-typography color="primary" strong>
              ${maskitoTransform(this.employee?.phoneNumber || '', {
                mask: MASK_PHONE,
              })}
            </ing-typography>
          </div>

          <div class="section">
            <ing-typography color="disabled" variant="body2">
              ${translate('fields.email.label', {
                ns: Namespaces.EMPLOYEE,
              })}
            </ing-typography>
            <ing-typography color="primary" strong>
              ${ifDefined(this.employee?.email)}
            </ing-typography>
          </div>

          <div class="section">
            <ing-typography color="disabled" variant="body2">
              ${translate('fields.department.label', {
                ns: Namespaces.EMPLOYEE,
              })}
            </ing-typography>
            <ing-typography color="primary" strong>
              ${ifDefined(this.employee?.department)}
            </ing-typography>
          </div>

          <div class="section">
            <ing-typography color="disabled" variant="body2">
              ${translate('fields.position.label', {
                ns: Namespaces.EMPLOYEE,
              })}
            </ing-typography>
            <ing-typography color="primary" strong>
              ${ifDefined(this.employee?.position)}
            </ing-typography>
          </div>
        </div>
        <div class="actions" slot="footer">
          <ing-button
            variant="contained"
            color="secondary"
            fullWidth
            @click=${() =>
              this.dispatchEvent(
                new CustomEvent('edit', {
                  detail: this.employee,
                  bubbles: true,
                  composed: true,
                })
              )}
          >
            <ing-icon-outlined-edit-square
              slot="prefix"
              color="tertiary"
            ></ing-icon-outlined-edit-square>
            ${translate('edit', {ns: Namespaces.COMMON})}
          </ing-button>
          <ing-button
            variant="contained"
            color="primary"
            fullWidth
            @click=${() =>
              this.dispatchEvent(
                new CustomEvent('delete', {
                  detail: this.employee,
                  bubbles: true,
                  composed: true,
                })
              )}
          >
            <ing-icon-filled-trash
              slot="prefix"
              color="tertiary"
            ></ing-icon-filled-trash>
            ${translate('delete', {ns: Namespaces.COMMON})}
          </ing-button>
        </div>
      </ing-surface>
    `;
  }
}

window.customElements.define('ing-employee-card', IngEmployeeCard);
