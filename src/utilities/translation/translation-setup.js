import i18next from 'i18next';
import I18NextHttpBackend from 'i18next-http-backend';
import {DEFAULT_LANGUAGE, LANGUAGES} from '../../models/language';

// TODO: get this from env
const TRANSLATION_BASE_URL = './static/locales';

export const Namespaces = {
  COMMON: 'common',
  EMPLOYEE: 'employee',
};
export const DEFAULT_NAMESPACE = Namespaces.COMMON;

i18next.use(I18NextHttpBackend).init({
  lng: DEFAULT_LANGUAGE.code,
  fallbackLng: DEFAULT_LANGUAGE.code,
  defaultNS: DEFAULT_NAMESPACE,
  ns: Object.values(Namespaces),
  supportedLngs: Object.values(LANGUAGES),
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
  backend: {
    loadPath: `${TRANSLATION_BASE_URL}/{{lng}}/{{ns}}.json`,
  },
});

export const i18n = i18next;
export const translate = i18next.t.bind(i18next);
