import {LitElement, html, css} from 'lit';

export class IngEmployeeEdit extends LitElement {
  /**
   * @type import('lit').PropertyDeclarations
   */
  static get properties() {
    return {
      employeeId: {type: String, reflect: true},
    };
  }

  /**
   * @type import('lit').CSSResultGroup
   */
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 16px;
      }
    `;
  }

  render() {
    return html`
      <h1>Employee Edit</h1>
      <p>Editing: ${this.employeeId}</p>
    `;
  }

  /**
   * @type {import('@vaadin/router').WebComponentInterface['onAfterEnter']}
   * @param {import('@vaadin/router').RouterLocation} location
   * @param {import('@vaadin/router').EmptyCommands} commands
   * @param {import('@vaadin/router').Router} router
   */
  onAfterEnter(location) {
    // Extract employeeId from the route parameters
    const {employeeId} = location.params;
    this.employeeId = employeeId;

    // You can add logic here to fetch employee data based on employeeId
    // For example, you might want to call an API to get the employee details
    console.log(`Editing employee with ID: ${this.employeeId}`);
  }
}

window.customElements.define('ing-employee-edit', IngEmployeeEdit);
