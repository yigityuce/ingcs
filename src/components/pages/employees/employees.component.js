import {LitElement, html, nothing} from 'lit';
import {ContextConsumer} from '@lit/context';
import {when} from 'lit/directives/when.js';
import {repeat} from 'lit/directives/repeat.js';
import {choose} from 'lit/directives/choose.js';
import {VIEW_MODES} from '../../../models';
import {Namespaces, StoreConnector, Translatable} from '../../../utilities';
import {appContext} from '../../../contexts/app.context';
import {classNames, styles} from './employees.style';

import '../../atoms/dialog';
import '../../atoms/typography';
import '../../atoms/button';
import '../../atoms/input';
import '../../atoms/icon-button';
import '../../atoms/no-data';
import '../../molecules/pagination';
import '../../molecules/page-header';
import '../../molecules/view-mode-selector';
import '../../molecules/confirmation-dialog';
import '../../organisms/employees-table';
import '../../organisms/employees-grid';
import '../../../icons';

export class IngEmployees extends StoreConnector(Translatable(LitElement)) {
  _appContext = new ContextConsumer(this, {context: appContext});

  /** @type import('lit').PropertyDeclarations */
  static properties = {
    _filteredEmployees: {type: Array, state: true},
    _selectedEmployees: {type: Array, state: true},
    _deletingEmployees: {type: Array, state: true},
  };

  /** @type import('lit').CSSResultGroup */
  static styles = [styles];

  constructor() {
    super();
    this.connectStore((state) => {
      this._filteredEmployees = state.employees
        .filter((employee) =>
          state.searchTerm
            ? !!Object.values(employee)
                .map((data) => `${data}`.toLowerCase())
                .find((data) => data.includes(state.searchTerm.toLowerCase()))
            : true
        )
        .slice(
          (state.pagination.page - 1) * state.pagination.pageSize,
          state.pagination.page * state.pagination.pageSize
        );
      this._selectedEmployees = this._filteredEmployees.filter((employee) =>
        state.selectedEmployees.includes(employee.email)
      );
    });
  }

  _onEdit(employee) {
    this._appContext.value.router.render(`/edit/${employee.email}`, true);
  }

  _onDelete(employees) {
    this._deletingEmployees = employees;
  }

  _renderEmpty() {
    return html`<ing-no-data slot="empty">
      <ing-typography variant="body2" color="disabled" strong>
        ${this.t('errorMessages.employeeNotFound', {
          ns: Namespaces.COMMON,
        })}
      </ing-typography>
    </ing-no-data>`;
  }

  render() {
    return html`
      <ing-surface footerSeparator paddingSize="x-large" gapSize="x-large">
        <ing-page-header slot="header">
          <div slot="title" class=${classNames.pageTitle}>
            <ing-typography variant="title4" color="secondary">
              ${this.t('title', {ns: Namespaces.EMPLOYEE})}
            </ing-typography>
            ${when(
              this._selectedEmployees?.length,
              () => html`<ing-button
                variant="text"
                color="primary"
                class=${classNames.deleteButton}
                @click=${() =>
                  (this._deletingEmployees = this._selectedEmployees)}
              >
                <ing-icon-filled-trash
                  slot="suffix"
                  color="secondary"
                ></ing-icon-filled-trash>
                ${this.t('delete.multiple-button-text', {
                  count: this._selectedEmployees?.length ?? 0,
                  ns: Namespaces.EMPLOYEE,
                })}
              </ing-button>`,
              () => nothing
            )}
          </div>
          <div class=${classNames.pageActions}>
            <ing-input
              type="text"
              class=${classNames.searchBar}
              placeholder=${this.t('search.placeholder', {
                ns: Namespaces.COMMON,
              })}
              .initialValue=${this.state.searchTerm}
              @input=${({detail}) => this.state.setSearchTerm(detail)}
            ></ing-input>
            <ing-view-mode-selector
              .viewMode=${this.state.viewMode}
              @viewModeChange=${({detail}) => this.state.setViewMode(detail)}
            ></ing-view-mode-selector>
          </div>
        </ing-page-header>
        ${choose(this.state.viewMode, [
          [
            VIEW_MODES.TABLE,
            () => html`<ing-employees-table
              .employees=${this._filteredEmployees}
              @delete=${(e) => this._onDelete([e.detail])}
              @edit=${(e) => this._onEdit(e.detail)}
            >
              ${this._renderEmpty()}
            </ing-employees-table>`,
          ],
          [
            VIEW_MODES.GRID,
            () => html`<ing-employees-grid
              .employees=${this._filteredEmployees}
              @delete=${(e) => this._onDelete([e.detail])}
              @edit=${(e) => this._onEdit(e.detail)}
            >
              ${this._renderEmpty()}
            </ing-employees-grid>`,
          ],
        ])}

        <div slot="footer" class=${classNames.footer}>
          <ing-pagination
            .currentPage=${this.state.pagination.page}
            .totalPages=${Math.ceil(
              this.state.employees.length / this.state.pagination.pageSize
            )}
            .visiblePageCountAroundCurrent=${1}
            @page-change=${(e) => {
              this.state.setPage(e.detail);
            }}
          ></ing-pagination>
        </div>

        <ing-confirmation-dialog
          ?open=${!!this._deletingEmployees?.length}
          size="auto"
          @close=${() => (this._deletingEmployees = [])}
          @cancel=${() => (this._deletingEmployees = [])}
          @confirm=${() => {
            (this._deletingEmployees || []).forEach((employee) => {
              this.state.deleteEmployee(employee);
            });
            this._deletingEmployees = [];
          }}
        >
          <span slot="header">
            ${this.t('delete.title', {ns: Namespaces.EMPLOYEE})}
          </span>
          ${this.t('delete.message', {
            ns: Namespaces.EMPLOYEE,
            count: this._deletingEmployees?.length || 0,
          })}
          <ul>
            ${repeat(
              this._deletingEmployees || [],
              (employee) => employee.email,
              (employee) =>
                html`<li>
                  ${[employee?.firstName, employee?.lastName]
                    .filter(Boolean)
                    .join(' ')}
                </li>`
            )}
          </ul>
        </ing-confirmation-dialog>
      </ing-surface>
    `;
  }
}

window.customElements.define('ing-employees', IngEmployees);
