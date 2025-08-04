import {LitElement, html, css} from 'lit';
import {appDataStore, translate, Namespaces} from '../../../utilities';
import {Translatable} from '../../../mixins';

import '../../molecules/pagination';
import '../../molecules/page-header';
import '../../organisms/page-layout';
import '../../templates/employees-table';

export class IngEmployees extends Translatable(LitElement) {
  /**
   * @type import('lit').PropertyDeclarations
   */
  static get properties() {
    return {
      _employees: {type: Array, state: true},
      _filteredEmployees: {type: Array, state: true},
      _currentPage: {type: Number, state: true},
      _pageSize: {type: Number, state: true},
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

      .page-footer {
        display: flex;
        justify-content: center;
        padding: var(--ing-size-spacing-medium);
      }
    `;
  }

  constructor() {
    super();
    this._employees = appDataStore.getState().employees || [];
    this._currentPage = 1;
    this._pageSize = 10; // Default page size, can be adjusted as needed
    appDataStore.subscribe((state) => {
      this._employees = state.employees || [];
    });
  }

  willUpdate(changedProperties) {
    if (
      changedProperties.has('_employees') ||
      changedProperties.has('_currentPage') ||
      changedProperties.has('_pageSize')
    ) {
      this._filteredEmployees = this._employees.slice(
        (this._currentPage - 1) * this._pageSize,
        this._currentPage * this._pageSize
      );
    }
  }

  render() {
    return html`
      <ing-page-layout stretch>
        <ing-page-header
          slot="header"
          title=${translate('title', {ns: Namespaces.EMPLOYEE})}
        >
        </ing-page-header>
        <ing-employees-table
          .employees=${this._filteredEmployees}
          @delete=${(e) => {
            appDataStore.getState().deleteEmployee(e.detail);
          }}
          @edit=${(e) => {
            console.log(e.detail);
            appDataStore.getState().editEmployee(e.detail);
          }}
        >
        </ing-employees-table>
        <div slot="footer" class="page-footer">
          <ing-pagination
            .currentPage=${this._currentPage}
            .totalPages=${Math.ceil(this._employees.length / this._pageSize)}
            .visiblePageCountAroundCurrent=${2}
            @page-change=${(e) => {
              this._currentPage = e.detail;
            }}
          ></ing-pagination>
        </div>
      </ing-page-layout>
    `;
  }
}

window.customElements.define('ing-employees', IngEmployees);
