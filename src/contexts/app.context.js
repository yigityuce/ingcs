import {createContext} from '@lit/context';

/**
 * @type {import('@lit/context').Context<string, { router: Router }>}
 */
export const appContext = createContext('app-context');
