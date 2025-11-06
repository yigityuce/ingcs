import {LitElement, html, css} from 'lit';
import {ContextConsumer} from '@lit/context';
import {StoreConnector} from '../../../utilities';
import {appContext} from '../../../contexts/app.context';

import '../../templates/employee-add-edit-template';

export class IngEmployeeAdd extends StoreConnector(LitElement) {
  _appContext = new ContextConsumer(this, {context: appContext});

  /**
   * @type import('lit').PropertyDeclarations
   */
  static get properties() {
    return {};
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

  render() {
    return html`
      <ing-employee-add-edit-template
        @submit=${(event) => {
          this.state.addEmployee(event.detail);
          this._appContext.value.router.render(`/`, true);
        }}
        @cancel=${() => {
          this._appContext.value.router.render(`/`, true);
        }}
      >
      </ing-employee-add-edit-template>
    `;
  }
}

window.customElements.define('ing-employee-add', IngEmployeeAdd);
