import {LitElement, html} from 'lit';
import {createRef, ref} from 'lit/directives/ref.js';
import {ContextProvider} from '@lit/context';
import {Router} from '@vaadin/router';
import {appContext} from './contexts/app.context';
import {StoreConnector, Translatable} from './utilities';
import {styles} from './app.style';

export class IngApp extends StoreConnector(Translatable(LitElement)) {
  /** @type Router */
  _routerInstance = null;

  /** @type {import('lit/directives/ref.js').Ref<HTMLElement>} */
  _routerElementRef = createRef();

  _appContextProvider = new ContextProvider(this, {context: appContext});

  /** @type import('lit').PropertyDeclarations */
  static properties = {};

  /** @type import('lit').CSSResultGroup */
  static styles = [styles];

  constructor() {
    super();
    this.connectStore((state) => this.setLanguage(state.language));
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
          await import(
            './components/templates/root-template/root-template.component'
          );
        },
        children: [
          {
            path: '/',
            component: 'ing-employees',
            action: async () => {
              await import('./components/pages/employees/employees.component');
            },
          },
          {
            path: '/add',
            component: 'ing-employee-add',
            action: async () => {
              await import(
                './components/pages/employee-add/employee-add.component'
              );
            },
          },
          {
            path: '/edit/:email',
            component: 'ing-employee-edit',
            action: async () => {
              await import(
                './components/pages/employee-edit/employee-edit.component'
              );
            },
          },
          {
            path: '(.*)',
            component: 'ing-not-found',
            action: async () => {
              await import('./components/pages/not-found/not-found.component');
            },
          },
        ],
      },
    ]);
  }
}

window.customElements.define('ing-app', IngApp);
