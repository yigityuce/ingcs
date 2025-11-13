import {LitElement, html} from 'lit';
import {ContextConsumer} from '@lit/context';
import {StoreConnector} from '../../../utilities';
import {appContext} from '../../../contexts/app.context';
import {styles} from './employee-add.style';

import '../../templates/manage-employee-template';

export class IngEmployeeAdd extends StoreConnector(LitElement) {
  _appContext = new ContextConsumer(this, {context: appContext});

  /** @type import('lit').PropertyDeclarations */
  static properties = {};

  /** @type import('lit').CSSResultGroup */
  static styles = [styles];

  render() {
    return html`
      <ing-manage-employee-template
        @submit=${(event) => {
          this.state.addEmployee(event.detail);
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

window.customElements.define('ing-employee-add', IngEmployeeAdd);
