import {LitElement, html, css} from 'lit';
import {ContextConsumer} from '@lit/context';
import {choose} from 'lit/directives/choose.js';
import {VIEW_MODES} from '../../../models';
import {Namespaces, StoreConnector, Translatable} from '../../../utilities';
import {appContext} from '../../../contexts/app.context';

import '../../atoms/dialog';
import '../../atoms/typography';
import '../../atoms/button';
import '../../atoms/icons';
import '../../atoms/icon-button';
import '../../molecules/pagination';
import '../../molecules/page-header';
import '../../organisms/employees-table';
import '../../organisms/employees-grid';

export class IngEmployees extends StoreConnector(Translatable(LitElement)) {
  _appContext = new ContextConsumer(this, {context: appContext});

  /** @type import('lit').PropertyDeclarations */
  static get properties() {
    return {
      _filteredEmployees: {type: Array, state: true},
      _deletingEmployee: {type: Object, state: true},
    };
  }

  /** @type import('lit').CSSResultGroup */
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
        <div class="view-selector">
            <ing-icon-button @click=${() =>
              this.state.setViewMode(VIEW_MODES.TABLE)}>
                <ing-icon-outlined-list color=${
                  this.state.viewMode === VIEW_MODES.TABLE
                    ? 'secondary'
                    : 'disabled'
                } size="large" /></ing-icon-outlined-list>
            </ing-icon-button>

            <ing-icon-button @click=${() =>
              this.state.setViewMode(VIEW_MODES.GRID)}>
                <ing-icon-outlined-grid color=${
                  this.state.viewMode === VIEW_MODES.GRID
                    ? 'secondary'
                    : 'disabled'
                } size="large" /></ing-icon-outlined-grid>
            </ing-icon-button>
        </div>
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
        
        <ing-dialog
          ?open=${!!this._deletingEmployee}
          size="auto"
          @close=${() => (this._deletingEmployee = undefined)}
        >
          <div slot="header">
            <ing-typography variant="title4" color="secondary" strong>
              ${this.t('delete.title', {ns: Namespaces.EMPLOYEE})}
            </ing-typography>
          </div>
          <ing-typography variant="body1" color="primary">
            ${this.t('delete.message', {
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
                this.state.deleteEmployee(this._deletingEmployee);
                this._deletingEmployee = undefined;
              }}
            >
              ${this.t('proceed', {ns: Namespaces.COMMON})}
            </ing-button>
            <ing-button
              variant="outlined"
              color="secondary"
              fullWidth
              @click=${() => (this._deletingEmployee = undefined)}
            >
              ${this.t('cancel', {ns: Namespaces.COMMON})}
            </ing-button>
          </div>
        </ing-dialog>
        <div slot="footer" class="page-footer">
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
      </ing-surface>
    `;
  }
}

window.customElements.define('ing-employees', IngEmployees);
