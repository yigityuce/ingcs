import {LitElement, html} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';
import {maskitoTransform} from '@maskito/core';
import {
  applyDefaultProps,
  formatDate,
  MASK_PHONE,
  Namespaces,
  Translatable,
} from '../../../utilities';
import {defaultProps, props} from './employee-card.props';
import {classNames, style} from './employee-card.style';

import '../../atoms/typography';
import '../../atoms/surface';
import '../../atoms/button';
import '../../../icons';

export class IngEmployeeCard extends Translatable(LitElement) {
  /** @type import('lit').PropertyDeclarations */
  static properties = {...props};

  /** @type import('lit').CSSResultGroup */
  static styles = [style];

  constructor() {
    super();
    applyDefaultProps(this, defaultProps);
  }

  render() {
    return html`
      <ing-surface
        withBorderRadius
        withBackground
        paddingSize="medium"
        gapSize="medium"
      >
        <div class=${classNames.content}>
          <ing-checkbox
            class=${classNames.selectedIndicator}
            .state=${this.selected ? 'checked' : 'unchecked'}
            @stateChange=${(e) =>
              this.dispatchEvent(
                new CustomEvent('selectionChange', {
                  detail: e.detail === 'checked',
                  bubbles: true,
                  composed: true,
                })
              )}
          ></ing-checkbox>
          <div class=${classNames.section}>
            <ing-typography color="disabled" variant="body2">
              ${this.t('fields.firstName.label', {ns: Namespaces.EMPLOYEE})}
            </ing-typography>
            <ing-typography color="primary" strong>
              ${ifDefined(this.employee?.firstName)}
            </ing-typography>
          </div>

          <div class=${classNames.section}>
            <ing-typography color="disabled" variant="body2">
              ${this.t('fields.lastName.label', {ns: Namespaces.EMPLOYEE})}
            </ing-typography>
            <ing-typography color="primary" strong>
              ${ifDefined(this.employee?.lastName)}
            </ing-typography>
          </div>

          <div class=${classNames.section}>
            <ing-typography color="disabled" variant="body2">
              ${this.t('fields.dateOfEmployment.label', {
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

          <div class=${classNames.section}>
            <ing-typography color="disabled" variant="body2">
              ${this.t('fields.dateOfBirth.label', {
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

          <div class=${classNames.section}>
            <ing-typography color="disabled" variant="body2">
              ${this.t('fields.phone.label', {
                ns: Namespaces.EMPLOYEE,
              })}
            </ing-typography>
            <ing-typography color="primary" strong>
              ${maskitoTransform(this.employee?.phoneNumber || '', {
                mask: MASK_PHONE,
              })}
            </ing-typography>
          </div>

          <div class=${classNames.section}>
            <ing-typography color="disabled" variant="body2">
              ${this.t('fields.email.label', {
                ns: Namespaces.EMPLOYEE,
              })}
            </ing-typography>
            <ing-typography color="primary" strong>
              ${ifDefined(this.employee?.email)}
            </ing-typography>
          </div>

          <div class=${classNames.section}>
            <ing-typography color="disabled" variant="body2">
              ${this.t('fields.department.label', {
                ns: Namespaces.EMPLOYEE,
              })}
            </ing-typography>
            <ing-typography color="primary" strong>
              ${ifDefined(this.employee?.department)}
            </ing-typography>
          </div>

          <div class=${classNames.section}>
            <ing-typography color="disabled" variant="body2">
              ${this.t('fields.position.label', {
                ns: Namespaces.EMPLOYEE,
              })}
            </ing-typography>
            <ing-typography color="primary" strong>
              ${ifDefined(this.employee?.position)}
            </ing-typography>
          </div>
        </div>

        <div class=${classNames.actions} slot="footer">
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
            ${this.t('edit', {ns: Namespaces.COMMON})}
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
            ${this.t('delete', {ns: Namespaces.COMMON})}
          </ing-button>
        </div>
      </ing-surface>
    `;
  }
}

window.customElements.define('ing-employee-card', IngEmployeeCard);
