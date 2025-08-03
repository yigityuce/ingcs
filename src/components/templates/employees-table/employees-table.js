import {LitElement, html, css} from 'lit';
import {repeat} from 'lit/directives/repeat.js';
import {maskitoTransform} from '@maskito/core';
import {formatDate, MASK_PHONE} from '../../../utilities';

import '../../atoms/typography';

export class IngEmployeesTable extends LitElement {
  /**
   * @type import('lit').PropertyDeclarations
   */
  static get properties() {
    return {
      employees: {type: Array}, // type { email: string, firstName: string, lastName: string, dateOfEmployment: Date, dateOfBirdiv: Date, phoneNumber: string, department: 'Analytics' | 'Tech', position: 'Junior' | 'Medior' | 'Senior', }
    };
  }

  /**
   * @type import('lit').CSSResultGroup
   */
  static get styles() {
    return css`
      :host {
        display: grid;
        grid-template-columns: min-content repeat(8, 1fr) min-content;
        column-gap: var(--ing-size-spacing-medium);
        width: 100%;
        background-color: var(--ing-color-background-surface);
        border-radius: var(--ing-size-radius-medium);
        position: relative;
        overflow: auto;
        max-height: 100%;
      }

      .row {
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
    `;
  }

  constructor() {
    super();
    this.employees = [];
  }

  render() {
    return html`
      <div class="row table-header">
        <div class="cell"><input type="checkbox" /></div>
        <ing-typography class="cell" color="secondary" strong>
          First Name
        </ing-typography>
        <ing-typography class="cell" color="secondary" strong>
          Last Name
        </ing-typography>
        <ing-typography class="cell" color="secondary" strong>
          Date of Employment
        </ing-typography>
        <ing-typography class="cell" color="secondary" strong>
          Date of Birth
        </ing-typography>
        <ing-typography class="cell" color="secondary" strong>
          Phone
        </ing-typography>
        <ing-typography class="cell" color="secondary" strong>
          Email
        </ing-typography>
        <ing-typography class="cell" color="secondary" strong>
          Department
        </ing-typography>
        <ing-typography class="cell" color="secondary" strong>
          Position
        </ing-typography>
        <ing-typography class="cell" color="secondary" strong>
          Actions
        </ing-typography>
      </div>
      ${repeat(
        this.employees,
        (employee) => employee.email,
        (employee) => html`
          <div class="row">
            <ing-typography class="cell">
              <input type="checkbox" />
            </ing-typography>
            <ing-typography class="cell">
              ${employee.firstName}
            </ing-typography>
            <ing-typography class="cell"> ${employee.lastName} </ing-typography>
            <ing-typography class="cell">
              ${formatDate(employee.dateOfEmployment)}
            </ing-typography>
            <ing-typography class="cell">
              ${formatDate(employee.dateOfBirth)}
            </ing-typography>
            <ing-typography class="cell">
              ${maskitoTransform(employee.phoneNumber, {mask: MASK_PHONE})}
            </ing-typography>
            <ing-typography class="cell"> ${employee.email} </ing-typography>
            <ing-typography class="cell">
              ${employee.department}
            </ing-typography>
            <ing-typography class="cell"> ${employee.position} </ing-typography>
            <div class="cell">
              <button
                @click="${() =>
                  this.dispatchEvent(
                    new CustomEvent('edit-employee', {detail: {employee}})
                  )}"
              >
                Edit
              </button>
              <button
                @click="${() =>
                  this.dispatchEvent(
                    new CustomEvent('delete-employee', {detail: {employee}})
                  )}"
              >
                Delete
              </button>
            </div>
          </div>
        `
      )}
    `;
  }
}

window.customElements.define('ing-employees-table', IngEmployeesTable);
