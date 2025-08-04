import {LitElement, html, css} from 'lit';
import {when} from 'lit/directives/when.js';
import {Translatable} from '../../../mixins';
import {Namespaces, translate} from '../../../utilities';

import '../../atoms/typography';
import '../../atoms/surface';
import '../../molecules/page-header';
import '../../organisms/employee-add-edit-form';

export class IngEmployeeAddEditTemplate extends Translatable(LitElement) {
  /**
   * @type import('lit').PropertyDeclarations
   */
  static get properties() {
    return {
      employee: {type: Object, attribute: false},
      _editing: {type: Boolean, attribute: false, state: true},
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
        width: clamp(100%, 100%, 100%);
        height: clamp(100%, 100%, 100%);
        overflow: hidden;
      }
    `;
  }

  willUpdate(changedProperties) {
    console.log('employee', this.employee);
    if (changedProperties.has('employee')) {
      this._editing = !!this.employee;
    }
  }

  render() {
    return html` <ing-surface
      footerSeparator
      paddingSize="x-large"
      gapSize="x-large"
    >
      <ing-page-header
        slot="header"
        title=${this._editing
          ? translate('edit.title', {ns: Namespaces.EMPLOYEE})
          : translate('add.title', {ns: Namespaces.EMPLOYEE})}
      >
      </ing-page-header>
      <ing-surface withBackground withBorderRadius paddingSize="small">
        ${when(
          this._editing,
          () =>
            html`<ing-typography strong slot="header">
              ${translate('edit.subtitle', {
                ns: Namespaces.EMPLOYEE,
                name: [this.employee.firstName, this.employee.lastName].join(
                  ' '
                ),
              })}
            </ing-typography>`,
          () => null
        )}
        <ing-employee-add-edit-form .employee=${this.employee}>
        </ing-employee-add-edit-form>
      </ing-surface>
    </ing-surface>`;
  }
}

window.customElements.define(
  'ing-employee-add-edit-template',
  IngEmployeeAddEditTemplate
);
