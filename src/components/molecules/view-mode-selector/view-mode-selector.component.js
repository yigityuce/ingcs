import {LitElement, html} from 'lit';
import {VIEW_MODES} from '../../../models';
import {applyDefaultProps, Translatable} from '../../../utilities';
import {styles} from './view-mode-selector.style';
import {defaultProps, props} from './view-mode-selector.props';

import '../../atoms/icon-button';
import '../../../icons';

export class IngViewModeSelector extends Translatable(LitElement) {
  /** @type import('lit').PropertyDeclarations */
  static properties = {...props};

  /** @type import('lit').CSSResultGroup */
  static styles = [styles];

  constructor() {
    super();
    applyDefaultProps(this, defaultProps);
  }

  _onChangeViewMode(mode) {
    this.dispatchEvent(
      new CustomEvent('viewModeChange', {
        detail: mode,
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
		<ing-icon-button @click=${() => this._onChangeViewMode(VIEW_MODES.TABLE)}>
			<ing-icon-outlined-list color=${
        this.viewMode === VIEW_MODES.TABLE ? 'secondary' : 'disabled'
      } size="large" /></ing-icon-outlined-list>
		</ing-icon-button>

		<ing-icon-button @click=${() => this._onChangeViewMode(VIEW_MODES.GRID)}>
			<ing-icon-outlined-grid color=${
        this.viewMode === VIEW_MODES.GRID ? 'secondary' : 'disabled'
      } size="large" /></ing-icon-outlined-grid>
		</ing-icon-button>
    `;
  }
}

window.customElements.define('ing-view-mode-selector', IngViewModeSelector);
