import {LitElement, html} from 'lit';
import {applyDefaultProps} from '../../../utilities';
import {styles} from './icon-button.style';
import {defaultProps, props} from './icon-button.props';

export class IngIconButton extends LitElement {
  /** @type import('lit').CSSResultGroup */
  static styles = [styles];

  /** @type import('lit').PropertyDeclarations */
  static properties = {...props};

  constructor() {
    super();
    applyDefaultProps(this, defaultProps);
  }

  render() {
    return html` <slot></slot> `;
  }
}

window.customElements.define('ing-icon-button', IngIconButton);
