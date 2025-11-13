import {LitElement, html} from 'lit';
import {applyDefaultProps} from '../../../utilities';
import {styles} from './surface.style';
import {defaultProps, props} from './surface.props';

export class IngSurface extends LitElement {
  /** @type import('lit').PropertyDeclarations */
  static properties = {...props};

  /** @type import('lit').CSSResultGroup */
  static styles = [styles];

  constructor() {
    super();
    applyDefaultProps(this, defaultProps);
  }

  render() {
    return html`
      <slot name="header"></slot>
      <slot></slot>
      <slot name="footer"></slot>
    `;
  }
}

window.customElements.define('ing-surface', IngSurface);
