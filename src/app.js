import {LitElement, html, css} from 'lit';
import {createRef, ref} from 'lit/directives/ref.js';
import {ContextProvider} from '@lit/context';
import {Router} from '@vaadin/router';
import {appContext} from './contexts/app.context';

export class IngApp extends LitElement {
  /**
   * @type Router
   */
  _routerInstance = null;
  _routerElementRef = createRef();
  _appContextProvider = new ContextProvider(this, {context: appContext});

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
        display: flex;
        box-sizing: border-box;
        flex-direction: column;
        width: clamp(100%, 100%, 100%);
        height: clamp(100%, 100%, 100%);
        overflow: hidden;
        background-color: var(--ing-color-background-default);
      }
      main {
        flex-grow: 1;
        overflow: hidden;
        max-height: 100%;
        max-width: 100%;
      }
    `;
  }

  firstUpdated() {
    this._initializeRouter();
  }

  render() {
    return html` <main ${ref(this._routerElementRef)}></main> `;
  }

  _initializeRouter() {
    if (!this._routerInstance) {
      this._routerInstance = new Router(this._routerElementRef.value);
      this._appContextProvider.setValue({
        ...this._appContextProvider.value,
        router: this._routerInstance,
      });
    }
    this._routerInstance.removeRoutes();
    this._routerInstance.setRoutes([
      {
        path: '/',
        component: 'ing-root-template',
        action: async () => {
          await import('./components/templates/root-template/root-template');
        },
        children: [
          {
            path: '/',
            component: 'ing-employees',
            action: async () => {
              await import('./components/pages/employees/employees');
            },
          },
          {
            path: '/add',
            component: 'ing-employee-add',
            action: async () => {
              await import('./components/pages/employee-add/employee-add');
            },
          },
          {
            path: '/edit/:email',
            component: 'ing-employee-edit',
            action: async () => {
              await import('./components/pages/employee-edit/employee-edit');
            },
          },
        ],
      },
    ]);
  }
}

window.customElements.define('ing-app', IngApp);
