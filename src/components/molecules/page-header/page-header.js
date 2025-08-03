import {LitElement, html, css} from 'lit';
import {when} from 'lit/directives/when.js';

import '../../atoms/typography';

export class IngPageHeader extends LitElement {
  /**
   * @type import('lit').PropertyDeclarations
   */
  static get properties() {
    return {
      title: {type: String},
    };
  }

  /**
   * @type import('lit').CSSResultGroup
   */
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: var(--ing-size-gap-medium);
      }

      ::slotted([slot='prefix']),
      ::slotted([slot='suffix']) {
        flex-shrink: 1;
      }
      ::slotted(:not([slot])) {
        flex-grow: 1;
      }
    `;
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
