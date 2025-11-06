import {store} from './store';

export const StoreConnector = (baseClass) =>
  class extends baseClass {
    /** @type {Array<() => void>} */
    _storeUnsubscribeFunctions = [];

    state = store.getState();

    connectedCallback() {
      this._storeUnsubscribeFunctions.push(
        store.subscribe((state) => (this.state = state))
      );
      super.connectedCallback && super.connectedCallback();
    }

    disconnectedCallback() {
      super.disconnectedCallback && super.disconnectedCallback();
      this._storeUnsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
    }

    /** @param {(state) => void} handler */
    connectStore(handler) {
      if (typeof handler === 'function') {
        handler(store.getState());
        this._storeUnsubscribeFunctions.push(store.subscribe(handler));
      }
    }
  };
