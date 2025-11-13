import {LitElement, html} from 'lit';
import {Namespaces, Translatable} from '../../../utilities';
import {props} from './manage-employee-template.props';
import {styles} from './manage-employee-template.style';

import '../../atoms/typography';
import '../../atoms/surface';
import '../../molecules/page-header';
import '../../organisms/employee-form';

export class IngManageEmployeeTemplate extends Translatable(LitElement) {
  /** @type import('lit').PropertyDeclarations */
  static properties = {...props};

  /** @type import('lit').CSSResultGroup */
  static styles = [styles];

  render() {
    return html` <ing-surface
      footerSeparator
      paddingSize="x-large"
      gapSize="x-large"
    >
      <ing-page-header
        slot="header"
        title=${this.employee
          ? this.t('edit.title', {
              ns: Namespaces.EMPLOYEE,
              name: [this.employee.firstName, this.employee.lastName]
                .filter(Boolean)
                .join(' '),
            })
          : this.t('add.title', {ns: Namespaces.EMPLOYEE})}
      >
      </ing-page-header>
      <ing-surface withBackground withBorderRadius paddingSize="small">
        <ing-employee-add-edit-form .employee=${this.employee}>
        </ing-employee-add-edit-form>
      </ing-surface>
    </ing-surface>`;
  }
}

window.customElements.define(
  'ing-manage-employee-template',
  IngManageEmployeeTemplate
);
