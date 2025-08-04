import {i18n} from '../utilities';

export const Translatable = (baseClass) =>
  class extends baseClass {
    firstUpdated() {
      i18n.on('initialized', () => {
        this.requestUpdate();
      });
      i18n.on('languageChanged', () => {
        this.requestUpdate();
      });
      super.firstUpdated && super.firstUpdated();
    }
  };
