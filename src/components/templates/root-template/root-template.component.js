import {LitElement, html} from 'lit';
import {styles} from './root-template.style';

import '../../atoms/surface';
import '../../organisms/navigation-bar';

export class IngRootTemplate extends LitElement {
  /** @type import('lit').PropertyDeclarations */
  static properties = {};

  /** @type import('lit').CSSResultGroup */
  static styles = [styles];

  render() {
    return html` <ing-surface>
      <ing-navigation-bar slot="header"></ing-navigation-bar>
      <slot></slot>
    </ing-surface>`;
  }
}

window.customElements.define('ing-root-template', IngRootTemplate);
