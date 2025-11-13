import {LitElement, html} from 'lit';
import {ContextConsumer} from '@lit/context';
import {choose} from 'lit/directives/choose.js';
import {VIEW_MODES} from '../../../models';
import {Namespaces, StoreConnector, Translatable} from '../../../utilities';
import {appContext} from '../../../contexts/app.context';
import {classNames, styles} from './employees.style';

import '../../atoms/dialog';
import '../../atoms/typography';
import '../../atoms/button';
import '../../atoms/icon-button';
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
    _deletingEmployee: {type: Object, state: true},
  };

  /** @type import('lit').CSSResultGroup */
  static styles = [styles];

  constructor() {
    super();
    this.connectStore((state) => {
      this._filteredEmployees = state.employees.slice(
        (state.pagination.page - 1) * state.pagination.pageSize,
        state.pagination.page * state.pagination.pageSize
      );
    });
  }

  render() {
    return html`
      <ing-surface footerSeparator paddingSize="x-large" gapSize="x-large">
        <ing-page-header
          slot="header"
          title=${this.t('title', {ns: Namespaces.EMPLOYEE})}
        >
          <ing-view-mode-selector
            .viewMode=${this.state.viewMode}
            @viewModeChange=${({detail}) => this.state.setViewMode(detail)}
          ></ing-view-mode-selector>
        </ing-page-header>
        ${choose(this.state.viewMode, [
          [
            VIEW_MODES.TABLE,
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
            VIEW_MODES.GRID,
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
          ?open=${!!this._deletingEmployee}
          size="auto"
          @close=${() => (this._deletingEmployee = undefined)}
          @cancel=${() => (this._deletingEmployee = undefined)}
          @confirm=${() => {
            this.state.deleteEmployee(this._deletingEmployee);
            this._deletingEmployee = undefined;
          }}
        >
          <span slot="header">
            ${this.t('delete.title', {ns: Namespaces.EMPLOYEE})}
          </span>
          ${this.t('delete.message', {
            ns: Namespaces.EMPLOYEE,
            name: [
              this._deletingEmployee?.firstName,
              this._deletingEmployee?.lastName,
            ].join(' '),
          })}
        </ing-confirmation-dialog>
      </ing-surface>
    `;
  }
}

window.customElements.define('ing-employees', IngEmployees);
