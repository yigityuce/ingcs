import {LitElement, html, css} from 'lit';

import '../../atoms/surface';
import '../../organisms/navigation-bar';

export class IngRootTemplate extends LitElement {
  /** @type import('lit').PropertyDeclarations */
  static get properties() {
    return {};
  }

  /** @type import('lit').CSSResultGroup */
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

  render() {
    return html` <ing-surface>
      <ing-navigation-bar slot="header"></ing-navigation-bar>
      <slot></slot>
    </ing-surface>`;
  }
}

window.customElements.define('ing-root-template', IngRootTemplate);
