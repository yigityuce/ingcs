import {LitElement, html, css} from 'lit';

import '../../templates/employee-add-edit-template';

export class IngEmployeeAdd extends LitElement {
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
      <ing-employee-add-edit-template> </ing-employee-add-edit-template>
    `;
  }
}

window.customElements.define('ing-employee-add', IngEmployeeAdd);
