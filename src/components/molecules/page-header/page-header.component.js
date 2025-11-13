import {LitElement, html} from 'lit';
import {when} from 'lit/directives/when.js';
import {applyDefaultProps} from '../../../utilities';
import {style} from './page-header.style';
import {defaultProps, props} from './page-header.props';

import '../../atoms/typography';

export class IngPageHeader extends LitElement {
  /** @type import('lit').PropertyDeclarations */
  static properties = {...props};

  /** @type import('lit').CSSResultGroup */
  static styles = [style];

  constructor() {
    super();
    applyDefaultProps(this, defaultProps);
  }

  render() {
    return html`
      ${when(
        this.title,
        () =>
          html`<ing-typography variant="title4" color="secondary">
            ${this.title}
          </ing-typography>`,
        () => html``
      )}
      <slot></slot>
    `;
  }
}

window.customElements.define('ing-page-header', IngPageHeader);
