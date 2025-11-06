import {LitElement, html, css} from 'lit';
import {repeat} from 'lit/directives/repeat.js';

import '../../atoms/typography';
import '../../atoms/icon-button';
import '../../atoms/icons';
import '../../atoms/surface';
import '../../molecules/employee-card';

export class IngEmployeesGrid extends LitElement {
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
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: var(--ing-size-gap-2x-large);
        row-gap: var(--ing-size-gap-x-large);

        @media screen and (max-width: 600px) {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        @media screen and (min-width: 601px) and (max-width: 1024px) {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      }
    `;
  }

  constructor() {
    super();
    this.employees = [];
  }

  render() {
    return html`
      ${repeat(
        this.employees,
        (employee) => employee.email,
        (employee) => html`<ing-employee-card
          .employee=${employee}
        ></ing-employee-card> `
      )}
    `;
  }
}

window.customElements.define('ing-employees-grid', IngEmployeesGrid);
