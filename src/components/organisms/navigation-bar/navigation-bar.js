import {LitElement, html, css} from 'lit';
import {ContextConsumer} from '@lit/context';
import {Translatable} from '../../../mixins';
import {appDataStore, Namespaces, translate} from '../../../utilities';
import {appContext} from '../../../contexts/app.context';
import {DEFAULT_LANGUAGE, LANGUAGES} from '../../../models/language';

import '../../atoms/logo';
import '../../atoms/typography';
import '../../atoms/button';
import '../../atoms/icons';
import {choose} from 'lit/directives/choose.js';

export class IngNavigationBar extends Translatable(LitElement) {
  _appContext = new ContextConsumer(this, {context: appContext});

  /**
   * @type import('lit').PropertyDeclarations
   */
  static get properties() {
    return {
      _language: {type: String, state: true}, // type: 'en-US', 'tr-TR', etc.
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
        justify-content: space-between;
        gap: var(--ing-size-gap-x-large);
        background-color: var(--ing-color-background-surface);
        padding: var(--ing-size-spacing-small);

        @media screen and (max-width: 600px) {
          flex-direction: column;
        }
      }

      .brand {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-self: flex-start;
        gap: var(--ing-size-gap-x-large);
      }

      .links-menu {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-self: flex-end;
        gap: var(--ing-size-gap-small);
      }
    `;
  }
  constructor() {
    super();
    this._language = appDataStore.getState().language || DEFAULT_LANGUAGE.code;
    appDataStore.subscribe((state) => {
      this._language = state.language || DEFAULT_LANGUAGE.code;
    });
  }

  render() {
    return html`
      <div class="brand">
        <ing-logo style="grid-area: logo;" size="small"></ing-logo>
        <ing-typography style="grid-area: title;" variant="title5">
          ING
        </ing-typography>
      </div>
      <div class="links-menu">
        <ing-button
          variant="text"
          color="primary"
          @click=${() => {
            this._appContext.value.router.render(`/`, true);
          }}
        >
          <ing-icon-outlined-people slot="prefix" color="secondary">
          </ing-icon-outlined-people>
          ${translate('navigationBar.employeesButton', {ns: Namespaces.COMMON})}
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
          ${translate('navigationBar.addNewButton', {ns: Namespaces.COMMON})}
        </ing-button>
        <ing-button
          variant="text"
          color="primary"
          @click=${() => {
            appDataStore
              .getState()
              .setLanguage(
                this._language === LANGUAGES.EN ? LANGUAGES.TR : LANGUAGES.EN
              );
          }}
        >
          ${choose(this._language, [
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
