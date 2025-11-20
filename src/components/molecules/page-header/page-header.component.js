import {LitElement, html} from 'lit';
import {style} from './page-header.style';

import '../../atoms/typography';

export class IngPageHeader extends LitElement {
  /** @type import('lit').PropertyDeclarations */
  static properties = {};

  /** @type import('lit').CSSResultGroup */
  static styles = [style];

  constructor() {
    super();
  }

  render() {
    return html`
      <slot name="title"></slot>
      <slot></slot>
    `;
  }
}

window.customElements.define('ing-page-header', IngPageHeader);
