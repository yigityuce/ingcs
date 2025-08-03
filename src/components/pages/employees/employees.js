import {LitElement, html, css} from 'lit';
import {appDataStore} from '../../../utilities';

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
    this._employees = appDataStore.getState().employees || [];
    appDataStore.subscribe((state) => {
      this._employees = state.employees || [];
    });
  }

  render() {
    return html`
      <ing-page-layout stretch>
        <ing-page-header slot="header" title="Employee List"> </ing-page-header>
        <ing-employees-table
          .employees=${this._employees}
          @delete=${(e) => {
            appDataStore.getState().deleteEmployee(e.detail);
          }}
          @edit=${(e) => {
            console.log(e.detail);
            appDataStore.getState().editEmployee(e.detail);
          }}
        >
        </ing-employees-table>
      </ing-page-layout>
    `;
  }
}

window.customElements.define('ing-employees', IngEmployees);
