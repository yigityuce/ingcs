import {LitElement, html, css} from 'lit';
import {ContextConsumer} from '@lit/context';
import {Translatable} from '../../../mixins';
import {Namespaces, translate} from '../../../utilities';
import {appContext} from '../../../contexts/app.context';

import '../../atoms/logo';
import '../../atoms/typography';
import '../../atoms/button';
import '../../atoms/icons';

export class IngNavigationBar extends Translatable(LitElement) {
  _appContext = new ContextConsumer(this, {context: appContext});

  /**
   * @type import('lit').PropertyDeclarations
   */
  static get properties() {
    return {};
  }

  /**
   * @type import('lit').CSSResultGroup
   */
  static get styles() {
    return css`
      :host {
        display: grid;
        grid-template-columns: min-content min-content auto min-content;
        grid-template-areas: 'logo title empty menu';
        gap: var(--ing-size-gap-x-large);
        background-color: var(--ing-color-background-surface);
        padding: var(--ing-size-spacing-small);
        align-items: center;
      }
      .links-menu {
        grid-area: menu;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: var(--ing-size-gap-small);
      }
    `;
  }

  render() {
    return html`
      <ing-logo style="grid-area: logo;" size="small"></ing-logo>
      <ing-typography style="grid-area: title;" variant="title5">
        ING
      </ing-typography>
      <div></div>
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
      </div>
    `;
  }
}

window.customElements.define('ing-navigation-bar', IngNavigationBar);
