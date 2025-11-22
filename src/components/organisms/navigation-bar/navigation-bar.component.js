import {LitElement, html} from 'lit';
import {ContextConsumer} from '@lit/context';
import {choose} from 'lit/directives/choose.js';
import {Namespaces, StoreConnector, Translatable} from '../../../utilities';
import {appContext} from '../../../contexts/app.context';
import {LANGUAGES} from '../../../models/language';
import {classNames, styles} from './navigation-bar.style';

import '../../atoms/logo';
import '../../atoms/typography';
import '../../atoms/button';
import '../../../icons';

export class IngNavigationBar extends StoreConnector(Translatable(LitElement)) {
  _appContext = new ContextConsumer(this, {context: appContext});

  /** @type import('lit').PropertyDeclarations */
  static properties = {};

  /** @type import('lit').CSSResultGroup */
  static styles = [styles];

  render() {
    return html`
      <div
        class=${classNames.brand}
        @click=${() => {
          this._appContext.value.router.render(`/`, true);
        }}
      >
        <ing-logo
          style="grid-area: logo;"
          size="small"
          @click=${() => {
            this._appContext.value.router.render(`/`, true);
          }}
        ></ing-logo>
        <ing-typography style="grid-area: title;" variant="title5">
          ING
        </ing-typography>
      </div>
      <div class=${classNames.links}>
        <!-- <ing-button
          variant="outlined"
          color="primary"
          @click=${() => {
          this.state.reinitEmployees();
        }}
        >
          ${this.t('navigationBar.feedDataButton', {ns: Namespaces.COMMON})}
        </ing-button> -->
        <ing-button
          variant="text"
          color="primary"
          @click=${() => {
            this._appContext.value.router.render(`/`, true);
          }}
        >
          <ing-icon-outlined-people slot="prefix" color="secondary">
          </ing-icon-outlined-people>
          ${this.t('navigationBar.employeesButton', {ns: Namespaces.COMMON})}
        </ing-button>
        <ing-button
          variant="text"
          color="primary"
          @click=${() => {
            this._appContext.value.router.render(`/add`, true);
          }}
        >
          <ing-icon-outlined-add slot="prefix" color="secondary">
          </ing-icon-outlined-add>
          ${this.t('navigationBar.addNewButton', {ns: Namespaces.COMMON})}
        </ing-button>
        <ing-button
          variant="text"
          color="primary"
          @click=${() => {
            this.state.setLanguage(
              this.state.language === LANGUAGES.EN ? LANGUAGES.TR : LANGUAGES.EN
            );
          }}
        >
          ${choose(this.state.language, [
            [
              'en-US',
              () =>
                html`<ing-icon-flag-en-us size="medium"></ing-icon-flag-en-us>`,
            ],
            [
              'tr-TR',
              () =>
                html`<ing-icon-flag-tr-tr size="medium"></ing-icon-flag-tr-tr>`,
            ],
          ])}
        </ing-button>
      </div>
    `;
  }
}

window.customElements.define('ing-navigation-bar', IngNavigationBar);
