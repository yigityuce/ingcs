import {LitElement, html} from 'lit';
import {repeat} from 'lit/directives/repeat.js';
import {when} from 'lit/directives/when.js';
import {applyDefaultProps, StoreConnector} from '../../../utilities';
import {defaultProps, props} from './employees-grid.props';
import {classNames, styles} from './employees-grid.style';

import '../../atoms/typography';
import '../../atoms/icon-button';
import '../../atoms/icon';
import '../../atoms/surface';
import '../../molecules/employee-card';

export class IngEmployeesGrid extends StoreConnector(LitElement) {
  /** @type import('lit').PropertyDeclarations */
  static properties = {...props};

  /** @type import('lit').CSSResultGroup */
  static styles = [styles];

  constructor() {
    super();
    applyDefaultProps(this, defaultProps);
  }

  render() {
    return html`
      ${when(
        (this.employees ?? []).length,
        () =>
          repeat(
            this.employees ?? [],
            (employee) => employee.email,
            (employee) => html`<ing-employee-card
              .employee=${employee}
              .selected=${this.state.selectedEmployees?.includes(
                employee.email
              )}
              @selectionChange=${() =>
                this.state.toggleEmployeeSelection(employee)}
            ></ing-employee-card> `
          ),
        () => html`<div class=${classNames.empty}>
          <slot name="empty"></slot>
        </div>`
      )}
    `;
  }
}

window.customElements.define('ing-employees-grid', IngEmployeesGrid);
