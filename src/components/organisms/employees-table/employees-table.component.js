import {maskitoTransform} from '@maskito/core';
import {LitElement, html} from 'lit';
import {repeat} from 'lit/directives/repeat.js';
import {when} from 'lit/directives/when.js';
import {classMap} from 'lit/directives/class-map.js';
import {
  applyDefaultProps,
  formatDate,
  MASK_PHONE,
  Namespaces,
  StoreConnector,
  Translatable,
} from '../../../utilities';
import {defaultProps, props} from './employees-table.props';
import {styles, classNames} from './employees-table.style';

import '../../atoms/typography';
import '../../atoms/checkbox';
import '../../atoms/icon-button';
import '../../atoms/surface';
import '../../../icons';

export class IngEmployeesTable extends StoreConnector(
  Translatable(LitElement)
) {
  /** @type import('lit').PropertyDeclarations */
  static properties = {...props};

  /** @type import('lit').CSSResultGroup */
  static styles = [styles];

  constructor() {
    super();
    this._cbState = 'indeterminate';
    applyDefaultProps(this, defaultProps);
  }

  _getGlobalCheckboxState() {
    const numberOfIntersectedEmployees = this.employees.filter((employee) =>
      this.state.selectedEmployees.includes(employee.email)
    ).length;

    if (numberOfIntersectedEmployees) {
      if (numberOfIntersectedEmployees === this.employees.length) {
        return 'checked';
      } else {
        return 'indeterminate';
      }
    } else {
      return 'unchecked';
    }
  }

  _renderRow(employee) {
    return html`
          <div class=${classNames.row}>
            <div class=${classNames.cell}>
              <ing-checkbox .state=${
                this.state.selectedEmployees?.includes(employee.email)
                  ? 'checked'
                  : 'unchecked'
              }
			 	@stateChange=${() => this.state.toggleEmployeeSelection(employee)} 
			  ></ing-checkbox>
            </div>
            <ing-typography class=${classNames.cell} strong noWrap>
              ${employee.firstName}
            </ing-typography>
            <ing-typography class=${classNames.cell} strong noWrap> 
            ${employee.lastName} 
        </ing-typography>
            <ing-typography class=${classNames.cell} noWrap>
              ${formatDate(
                typeof employee.dateOfEmployment === 'string'
                  ? new Date(employee.dateOfEmployment)
                  : employee.dateOfEmployment
              )}
            </ing-typography>
            <ing-typography class=${classNames.cell} noWrap>
              ${formatDate(
                typeof employee.dateOfBirth === 'string'
                  ? new Date(employee.dateOfBirth)
                  : employee.dateOfBirth
              )}
            </ing-typography>
            <ing-typography class=${classNames.cell} noWrap>
              ${maskitoTransform(employee?.phoneNumber || '', {
                mask: MASK_PHONE,
              })}
            </ing-typography>
            <ing-typography class=${classNames.cell} noWrap> ${
      employee.email
    } </ing-typography>
            <ing-typography class=${classNames.cell} noWrap>
              ${employee.department}
            </ing-typography>
            <ing-typography class=${classNames.cell} noWrap> ${
      employee.position
    } </ing-typography>
            <div class=${classNames.cell}>
                <div class=${classNames.actions}>
                    <ing-icon-button @click=${() =>
                      this.dispatchEvent(
                        new CustomEvent('edit', {detail: employee})
                      )}>
                        <ing-icon-outlined-edit-square color="secondary" size="medium" /></ing-icon-outlined-edit-square>
                    </ing-icon-button>

                    <ing-icon-button @click=${() =>
                      this.dispatchEvent(
                        new CustomEvent('delete', {detail: employee})
                      )}>
                        <ing-icon-filled-trash color="secondary" size="medium" /></ing-icon-filled-trash>
                    </ing-icon-button>
                </div>
                </div>
          </div>
        `;
  }

  render() {
    return html`
      <ing-surface withBackground withBorderRadius>
        <div class=${classNames.table}>
          <div
            class=${classMap({
              [classNames.row]: true,
              [classNames.tableHeader]: true,
            })}
          >
            <div class=${classNames.cell}>
              <ing-checkbox
                .state=${this._getGlobalCheckboxState()}
                .disabled=${!this.employees?.length}
                @stateChange=${({detail}) =>
                  this.state.setEmployeeSelection(
                    detail === 'checked' ? this.employees : []
                  )}
              ></ing-checkbox>
            </div>
            <ing-typography class=${classNames.cell} color="secondary" strong>
              ${this.t('fields.firstName.label', {ns: Namespaces.EMPLOYEE})}
            </ing-typography>
            <ing-typography class=${classNames.cell} color="secondary" strong>
              ${this.t('fields.lastName.label', {ns: Namespaces.EMPLOYEE})}
            </ing-typography>
            <ing-typography class=${classNames.cell} color="secondary" strong>
              ${this.t('fields.dateOfEmployment.label', {
                ns: Namespaces.EMPLOYEE,
              })}
            </ing-typography>
            <ing-typography class=${classNames.cell} color="secondary" strong>
              ${this.t('fields.dateOfBirth.label', {
                ns: Namespaces.EMPLOYEE,
              })}
            </ing-typography>
            <ing-typography class=${classNames.cell} color="secondary" strong>
              ${this.t('fields.phone.label', {ns: Namespaces.EMPLOYEE})}
            </ing-typography>
            <ing-typography class=${classNames.cell} color="secondary" strong>
              ${this.t('fields.email.label', {ns: Namespaces.EMPLOYEE})}
            </ing-typography>
            <ing-typography class=${classNames.cell} color="secondary" strong>
              ${this.t('fields.department.label', {ns: Namespaces.EMPLOYEE})}
            </ing-typography>
            <ing-typography class=${classNames.cell} color="secondary" strong>
              ${this.t('fields.position.label', {ns: Namespaces.EMPLOYEE})}
            </ing-typography>
            <ing-typography class=${classNames.cell} color="secondary" strong>
              ${this.t('fields.actions.label', {ns: Namespaces.EMPLOYEE})}
            </ing-typography>
          </div>
          ${when(
            (this.employees ?? []).length,
            () =>
              repeat(
                this.employees,
                (employee) => employee.email,
                (employee) => this._renderRow(employee)
              ),
            () => html`<div class=${classNames.empty}>
              <slot name="empty"></slot>
            </div>`
          )}
        </div>
      </ing-surface>
    `;
  }
}

window.customElements.define('ing-employees-table', IngEmployeesTable);
