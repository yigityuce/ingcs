import {LitElement, html, css} from 'lit';
import {repeat} from 'lit/directives/repeat.js';
import {maskitoTransform} from '@maskito/core';
import {
  formatDate,
  MASK_PHONE,
  Namespaces,
  Translatable,
} from '../../../utilities';

import '../../atoms/typography';
import '../../atoms/icon-button';
import '../../atoms/icons';
import '../../atoms/surface';

export class IngEmployeesTable extends Translatable(LitElement) {
  /** @type import('lit').PropertyDeclarations */
  static get properties() {
    return {
      employees: {type: Array}, // type { email: string, firstName: string, lastName: string, dateOfEmployment: Date, dateOfBirth: Date, phoneNumber: string, department: 'Analytics' | 'Tech', position: 'Junior' | 'Medior' | 'Senior', }
    };
  }

  /** @type import('lit').CSSResultGroup */
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        max-height: 100%;
        overflow: hidden;
      }
      .table {
        display: grid;
        grid-template-columns: min-content repeat(8, 1fr) min-content;
        column-gap: var(--ing-size-gap-x-large);
        position: relative;
        overflow: auto;
        max-height: 100%;
        align-content: flex-start;
      }

      .row {
        height: fit-content;
        display: grid;
        grid-template-columns: subgrid;
        grid-column: span 10;
        border-bottom: 1px solid var(--ing-color-grey-200);
        place-items: center;
        padding: var(--ing-size-spacing-large) var(--ing-size-spacing-small);
      }

      .table-header {
        top: 0;
        position: sticky;
        z-index: 2;
        background-color: var(--ing-color-background-surface);
      }

      .actions {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
    `;
  }

  constructor() {
    super();
    this.employees = [];
  }

  render() {
    return html`
      <ing-surface withBackground withBorderRadius>
        <div class="table">
          <div class="row table-header">
            <div class="cell"><input type="checkbox" /></div>
            <ing-typography class="cell" color="secondary" strong>
              ${this.t('fields.firstName.label', {ns: Namespaces.EMPLOYEE})}
            </ing-typography>
            <ing-typography class="cell" color="secondary" strong>
              ${this.t('fields.lastName.label', {ns: Namespaces.EMPLOYEE})}
            </ing-typography>
            <ing-typography class="cell" color="secondary" strong>
              ${this.t('fields.dateOfEmployment.label', {
                ns: Namespaces.EMPLOYEE,
              })}
            </ing-typography>
            <ing-typography class="cell" color="secondary" strong>
              ${this.t('fields.dateOfBirth.label', {
                ns: Namespaces.EMPLOYEE,
              })}
            </ing-typography>
            <ing-typography class="cell" color="secondary" strong>
              ${this.t('fields.phone.label', {ns: Namespaces.EMPLOYEE})}
            </ing-typography>
            <ing-typography class="cell" color="secondary" strong>
              ${this.t('fields.email.label', {ns: Namespaces.EMPLOYEE})}
            </ing-typography>
            <ing-typography class="cell" color="secondary" strong>
              ${this.t('fields.department.label', {ns: Namespaces.EMPLOYEE})}
            </ing-typography>
            <ing-typography class="cell" color="secondary" strong>
              ${this.t('fields.position.label', {ns: Namespaces.EMPLOYEE})}
            </ing-typography>
            <ing-typography class="cell" color="secondary" strong>
              ${this.t('fields.actions.label', {ns: Namespaces.EMPLOYEE})}
            </ing-typography>
          </div>
          ${repeat(
            this.employees,
            (employee) => employee.email,
            (employee) => html`
          <div class="row">
            <div class="cell">
              <input type="checkbox" />
            </div>
            <ing-typography class="cell" strong noWrap>
              ${employee.firstName}
            </ing-typography>
            <ing-typography class="cell" strong noWrap> 
            ${employee.lastName} 
        </ing-typography>
            <ing-typography class="cell" noWrap>
              ${formatDate(
                typeof employee.dateOfEmployment === 'string'
                  ? new Date(employee.dateOfEmployment)
                  : employee.dateOfEmployment
              )}
            </ing-typography>
            <ing-typography class="cell" noWrap>
              ${formatDate(
                typeof employee.dateOfBirth === 'string'
                  ? new Date(employee.dateOfBirth)
                  : employee.dateOfBirth
              )}
            </ing-typography>
            <ing-typography class="cell" noWrap>
              ${maskitoTransform(employee?.phoneNumber || '', {
                mask: MASK_PHONE,
              })}
            </ing-typography>
            <ing-typography class="cell" noWrap> ${
              employee.email
            } </ing-typography>
            <ing-typography class="cell" noWrap>
              ${employee.department}
            </ing-typography>
            <ing-typography class="cell" noWrap> ${
              employee.position
            } </ing-typography>
            <div class="cell">
                <div class="actions">
                    <ing-icon-button @click=${() =>
                      this.dispatchEvent(
                        new CustomEvent('edit', {detail: employee})
                      )}>
                        <ing-icon-outlined-edit-square color="secondary" size="medium" /></ing-icon-outlined-edit-square>
                    </ing-icon-button>

                    <ing-icon-button @click=${() =>
                      this.dispatchEvent(
                        new CustomEvent('delete', {detail: employee})
                      )}>
                        <ing-icon-filled-trash color="secondary" size="medium" /></ing-icon-filled-trash>
                    </ing-icon-button>
                </div>
                </div>
          </div>
        `
          )}
        </div>
      </ing-surface>
    `;
  }
}

window.customElements.define('ing-employees-table', IngEmployeesTable);
