import {LitElement, html, css} from 'lit';
import {faker} from '@faker-js/faker';

import '../../molecules/page-header';
import '../../organisms/page-layout';
import '../../templates/employees-table';

export class IngEmployees extends LitElement {
  /**
   * @type import('lit').PropertyDeclarations
   */
  static get properties() {
    return {
      _employees: {type: Array, state: true},
    };
  }

  /**
   * @type import('lit').CSSResultGroup
   */
  static get styles() {
    return css`
      :host {
        display: block;
        width: clamp(100%, 100%, 100%);
        height: clamp(100%, 100%, 100%);
      }
    `;
  }

  constructor() {
    super();
    this._employees = faker.helpers.multiple(
      () => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email(firstName, lastName);
        return {
          email,
          firstName,
          lastName,
          dateOfEmployment: faker.date.past(10),
          dateOfBirth: faker.date.birthdate({min: 25, max: 50, mode: 'age'}),
          phoneNumber: faker.phone.number({style: 'international'}),
          department: faker.helpers.arrayElement(['Analytics', 'Tech']),
          position: faker.helpers.arrayElement(['Junior', 'Medior', 'Senior']),
        };
      },
      {count: 30}
    );
  }

  render() {
    return html`
      <ing-page-layout stretch>
        <ing-page-header slot="header" title="Employee List"> </ing-page-header>
        <ing-employees-table
          .employees=${this._employees}
        ></ing-employees-table>
      </ing-page-layout>
    `;
  }
}

window.customElements.define('ing-employees', IngEmployees);
