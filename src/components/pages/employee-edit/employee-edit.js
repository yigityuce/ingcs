import {LitElement, html, css} from 'lit';
import {Translatable} from '../../../mixins';
import {appDataStore} from '../../../utilities';

import '../../templates/employee-add-edit-template';

export class IngEmployeeEdit extends Translatable(LitElement) {
  /**
   * @type import('lit').PropertyDeclarations
   */
  static get properties() {
    return {
      _email: {type: String, attribute: false, state: true},
      _employee: {type: Object, attribute: false, state: true},
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
        gap: var(--ing-size-gap-x-large);
        width: clamp(100%, 100%, 100%);
        height: clamp(100%, 100%, 100%);
      }
    `;
  }

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

  willUpdate(changedProperties) {
    if (changedProperties.has('_email')) {
      this._employee = (appDataStore.getState().employees || []).find(
        (employee) => employee.email === this._email
      );
    }
  }

  firstUpdated() {
    // TODO: remove
    this._employee = appDataStore.getState().employees[0];
  }

  render() {
    return html`
      <ing-employee-add-edit-template .employee=${this._employee}>
      </ing-employee-add-edit-template>
    `;
  }
}

window.customElements.define('ing-employee-edit', IngEmployeeEdit);
