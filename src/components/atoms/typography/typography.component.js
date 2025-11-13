import {LitElement, html} from 'lit';
import {applyDefaultProps} from '../../../utilities';
import {defaultProps, props} from './typography.props';
import {styles} from './typography.style';

export class IngTypography extends LitElement {
  /** @type import('lit').PropertyDeclarations */
  static properties = {...props};

  /** @type import('lit').CSSResultGroup */
  static styles = [styles];

  constructor() {
    super();
    applyDefaultProps(this, defaultProps);
  }

  render() {
    return html` <slot></slot> `;
  }
}

window.customElements.define('ing-typography', IngTypography);
