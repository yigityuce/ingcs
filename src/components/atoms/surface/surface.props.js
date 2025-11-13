/** @type import('lit').PropertyDeclarations */
export const props = {
  gapSize: {type: String, reflect: true}, // type: 'x-small', 'small', 'medium', 'large', 'x-large'
  paddingSize: {type: String, reflect: true}, // type: 'x-small', 'small', 'medium', 'large', 'x-large'
  withBorderRadius: {type: Boolean, reflect: true},
  withBackground: {type: Boolean, reflect: true},
  footerSeparator: {type: Boolean, reflect: true},
  headerSeparator: {type: Boolean, reflect: true},
};

export const defaultProps = {
  gapSize: null,
  paddingSize: null,
  withBorderRadius: false,
  withBackground: false,
  footerSeparator: false,
  headerSeparator: false,
};
