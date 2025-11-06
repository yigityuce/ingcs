import i18next from 'i18next';
import I18NextHttpBackend from 'i18next-http-backend';
import {DEFAULT_LANGUAGE, LANGUAGES} from '../../models';
import {DEFAULT_NAMESPACE, Namespaces, TRANSLATION_BASE_URL} from './constants';

if (!i18next.isInitialized) {
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
}

export const Translatable = (baseClass) =>
  class extends baseClass {
    t = i18next.t.bind(i18next);

    setLanguage(languageCode) {
      return i18next.changeLanguage(
        Object.values(LANGUAGES).includes(languageCode)
          ? languageCode
          : DEFAULT_LANGUAGE.code
      );
    }

    firstUpdated() {
      i18next.on('initialized', () => {
        this.requestUpdate();
      });
      i18next.on('languageChanged', () => {
        this.requestUpdate();
      });
      super.firstUpdated && super.firstUpdated();
    }
  };
