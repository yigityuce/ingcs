import {LitElement, html, css} from 'lit';
import {ContextConsumer} from '@lit/context';
import {appDataStore, translate, Namespaces} from '../../../utilities';
import {appContext} from '../../../contexts/app.context';
import {Translatable} from '../../../mixins';

import '../../atoms/dialog';
import '../../atoms/typography';
import '../../atoms/button';
import '../../atoms/icons';
import '../../atoms/icon-button';
import '../../molecules/pagination';
import '../../molecules/page-header';
import '../../organisms/employees-table';
import '../../organisms/employees-grid';
import {choose} from 'lit/directives/choose.js';

export class IngEmployees extends Translatable(LitElement) {
  _appContext = new ContextConsumer(this, {context: appContext});

  /**
   * @type import('lit').PropertyDeclarations
   */
  static get properties() {
    return {
      _employees: {type: Array, state: true},
      _filteredEmployees: {type: Array, state: true},
      _deletingEmployee: {type: Object, state: true},
      _currentPage: {type: Number, state: true},
      _pageSize: {type: Number, state: true},
      _viewMode: {type: String, state: true}, // 'table' or 'grid'
    };
  }

  /**
   * @type import('lit').CSSResultGroup
   */
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        overflow: auto;
        width: clamp(100%, 100%, 100%);
        height: clamp(100%, 100%, 100%);
      }

      .page-footer {
        display: flex;
        justify-content: center;
        padding-top: var(--ing-size-spacing-medium);
      }

      .view-selector {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        gap: var(--ing-size-gap-x-small);
      }
    `;
  }

  constructor() {
    super();
    this._employees = appDataStore.getState().employees || [];
    this._currentPage = appDataStore.getState().employeesTableCurrentPage || 1;
    this._pageSize = 10; // Default page size, can be adjusted as needed
    this._viewMode = 'table';
    appDataStore.subscribe((state) => {
      this._employees = state.employees || [];
      this._currentPage = state.employeesTableCurrentPage;
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

      appDataStore.getState().setEmployeesTableCurrentPage(this._currentPage);
    }
  }

  render() {
    return html`
      <ing-surface footerSeparator paddingSize="x-large" gapSize="x-large">
        <ing-page-header
          slot="header"
          title=${translate('title', {ns: Namespaces.EMPLOYEE})}
        >
        <div class="view-selector">
            <ing-icon-button @click=${() => (this._viewMode = 'table')}>
                <ing-icon-outlined-list color=${
                  this._viewMode === 'table' ? 'secondary' : 'disabled'
                } size="large" /></ing-icon-outlined-list>
            </ing-icon-button>

            <ing-icon-button @click=${() => (this._viewMode = 'grid')}>
                <ing-icon-outlined-grid color=${
                  this._viewMode === 'grid' ? 'secondary' : 'disabled'
                } size="large" /></ing-icon-outlined-grid>
            </ing-icon-button>
        </div>
        </ing-page-header>
        ${choose(this._viewMode, [
          [
            'table',
            () => html`<ing-employees-table
              .employees=${this._filteredEmployees}
              @delete=${(e) => {
                this._deletingEmployee = e.detail;
              }}
              @edit=${(e) => {
                this._appContext.value.router.render(
                  `/edit/${e.detail.email}`,
                  true
                );
              }}
            >
            </ing-employees-table>`,
          ],
          [
            'grid',
            () => html`<ing-employees-grid
              .employees=${this._filteredEmployees}
              @delete=${(e) => {
                this._deletingEmployee = e.detail;
              }}
              @edit=${(e) => {
                this._appContext.value.router.render(
                  `/edit/${e.detail.email}`,
                  true
                );
              }}
            >
            </ing-employees-grid>`,
          ],
        ])}
        
        <ing-dialog
          ?open=${!!this._deletingEmployee}
          size="auto"
          @close=${() => (this._deletingEmployee = undefined)}
        >
          <div slot="header">
            <ing-typography variant="title4" color="secondary" strong>
              ${translate('delete.title', {ns: Namespaces.EMPLOYEE})}
            </ing-typography>
          </div>
          <ing-typography variant="body1" color="primary">
            ${translate('delete.message', {
              ns: Namespaces.EMPLOYEE,
              name: [
                this._deletingEmployee?.firstName,
                this._deletingEmployee?.lastName,
              ].join(' '),
            })}
          </ing-typography>
          <div
            slot="footer"
            style="display: flex; flex-direction: column; gap: var(--ing-size-spacing-x-small);"
          >
            <ing-button
              variant="contained"
              color="primary"
              fullWidth
              @click=${() => {
                appDataStore.getState().deleteEmployee(this._deletingEmployee);
                this._deletingEmployee = undefined;
              }}
            >
              ${translate('proceed', {ns: Namespaces.COMMON})}
            </ing-button>
            <ing-button
              variant="outlined"
              color="secondary"
              fullWidth
              @click=${() => (this._deletingEmployee = undefined)}
            >
              ${translate('cancel', {ns: Namespaces.COMMON})}
            </ing-button>
          </div>
        </ing-dialog>
        <div slot="footer" class="page-footer">
          <ing-pagination
            .currentPage=${this._currentPage}
            .totalPages=${Math.ceil(this._employees.length / this._pageSize)}
            .visiblePageCountAroundCurrent=${1}
            @page-change=${(e) => {
              this._currentPage = e.detail;
            }}
          ></ing-pagination>
        </div>
      </ing-surface>
    `;
  }
}

window.customElements.define('ing-employees', IngEmployees);
