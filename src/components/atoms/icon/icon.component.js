import {LitElement} from 'lit';
import {applyDefaultProps} from '../../../utilities';
import {styles} from './icon.style';
import {defaultProps, props} from './icon.props';

export class IngIconBase extends LitElement {
  /** @type import('lit').CSSResultGroup */
  static styles = [styles];

  /** @type import('lit').PropertyDeclarations */
  static properties = {...props};

  constructor() {
    super();
    applyDefaultProps(this, defaultProps);
  }
}
