import {LitElement, html} from 'lit';
import {ContextConsumer} from '@lit/context';
import {guard} from 'lit/directives/guard.js';
import {StoreConnector, Translatable} from '../../../utilities';
import {appContext} from '../../../contexts/app.context';
import {styles} from './employee-edit.style';

import '../../templates/manage-employee-template';

export class IngEmployeeEdit extends StoreConnector(Translatable(LitElement)) {
  _appContext = new ContextConsumer(this, {context: appContext});

  /** @type import('lit').PropertyDeclarations */
  static properties = {
    _email: {type: String, attribute: false, state: true},
  };

  /** @type import('lit').CSSResultGroup */
  static styles = [styles];

  /**
   * @type {import('@vaadin/router').WebComponentInterface['onAfterEnter']}
   * @param {import('@vaadin/router').RouterLocation} location
   * @param {import('@vaadin/router').EmptyCommands} commands
   * @param {import('@vaadin/router').Router} router
   */
  onAfterEnter(location) {
    // Extract email from the route parameters
    this._email = location.params?.email;
  }

  render() {
    return html`
      <ing-manage-employee-template
        .employee=${guard([this._email, this.state.employees], () =>
          (this.state.employees || []).find(
            (employee) => employee.email === this._email
          )
        )}
        @submit=${(event) => {
          this.state.editEmployee(this._employee.email, event.detail);
          this._appContext.value.router.render(`/`, true);
        }}
        @cancel=${() => {
          this._appContext.value.router.render(`/`, true);
        }}
      >
      </ing-manage-employee-template>
    `;
  }
}

window.customElements.define('ing-employee-edit', IngEmployeeEdit);
