import {LitElement, html} from 'lit';
import {ContextConsumer} from '@lit/context';
import {Namespaces, Translatable} from '../../../utilities';
import {appContext} from '../../../contexts/app.context';
import {styles} from './not-found.style';

import '../../atoms/typography';
import '../../atoms/no-data';

export class IngNotFound extends Translatable(LitElement) {
  _appContext = new ContextConsumer(this, {context: appContext});

  /** @type import('lit').CSSResultGroup */
  static styles = [styles];

  render() {
    return html`
      <ing-no-data>
        <ing-typography variant="body2" color="disabled" strong>
          ${this.t('errorMessages.pageNotFound', {
            ns: Namespaces.COMMON,
          })}
        </ing-typography>
      </ing-no-data>

      <ing-button
        variant="contained"
        color="primary"
        @click=${() => {
          this._appContext.value.router.render(`/`, true);
        }}
      >
        <ing-icon-outlined-people slot="prefix" color="tertiary">
        </ing-icon-outlined-people>
        ${this.t('navigationBar.employeesButton', {ns: Namespaces.COMMON})}
      </ing-button>
    `;
  }
}

window.customElements.define('ing-not-found', IngNotFound);
