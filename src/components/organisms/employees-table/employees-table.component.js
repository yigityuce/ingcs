import {maskitoTransform} from '@maskito/core';
import {LitElement, html} from 'lit';
import {repeat} from 'lit/directives/repeat.js';
import {classMap} from 'lit/directives/class-map.js';
import {
  applyDefaultProps,
  formatDate,
  MASK_PHONE,
  Namespaces,
  Translatable,
} from '../../../utilities';
import {defaultProps, props} from './employees-table.props';
import {styles, classNames} from './employees-table.style';

import '../../atoms/typography';
import '../../atoms/icon-button';
import '../../atoms/surface';
import '../../../icons';

export class IngEmployeesTable extends Translatable(LitElement) {
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
      <ing-surface withBackground withBorderRadius>
        <div class=${classNames.table}>
          <div
            class=${classMap({
              [classNames.row]: true,
              [classNames.tableHeader]: true,
            })}
          >
            <div class=${classNames.cell}><input type="checkbox" /></div>
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
          ${repeat(
            this.employees ?? [],
            (employee) => employee.email,
            (employee) => html`
          <div class=${classNames.row}>
            <div class=${classNames.cell}>
              <input type="checkbox" />
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
        `
          )}
        </div>
      </ing-surface>
    `;
  }
}

window.customElements.define('ing-employees-table', IngEmployeesTable);
