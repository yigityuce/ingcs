import {LitElement, html} from 'lit';
import {repeat} from 'lit/directives/repeat.js';
import {applyDefaultProps} from '../../../utilities';
import {defaultProps, props} from './employees-grid.props';
import {styles} from './employees-grid.style';

import '../../atoms/typography';
import '../../atoms/icon-button';
import '../../atoms/icon';
import '../../atoms/surface';
import '../../molecules/employee-card';

export class IngEmployeesGrid extends LitElement {
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
      ${repeat(
        this.employees ?? [],
        (employee) => employee.email,
        (employee) => html`<ing-employee-card
          .employee=${employee}
        ></ing-employee-card> `
      )}
    `;
  }
}

window.customElements.define('ing-employees-grid', IngEmployeesGrid);
