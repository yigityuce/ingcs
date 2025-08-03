import {LitElement, html, css} from 'lit';

import '../../atoms/logo';
import '../../atoms/typography';

export class IngNavigationBar extends LitElement {
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
        display: grid;
        grid-template-columns: min-content min-content auto min-content;
        grid-template-areas: 'logo title empty menu';
        gap: var(--ing-size-gap-x-large);
        background-color: var(--ing-color-background-surface);
        padding: var(--ing-size-spacing-medium);
        align-items: center;
      }
    `;
  }

  render() {
    return html`
      <ing-logo style="grid-area: logo;" size="small"></ing-logo>
      <ing-typography style="grid-area: title;" variant="title5">
        ING
      </ing-typography>
    `;
  }
}

window.customElements.define('ing-navigation-bar', IngNavigationBar);
