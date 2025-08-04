import {createContext} from '@lit/context';

/**
 * @type {import('@lit/context').Context<string, { router: import('@vaadin/router').Router }>}
 */
export const appContext = createContext('app-context');
