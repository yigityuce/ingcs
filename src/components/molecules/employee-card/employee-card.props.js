/** @type import('lit').PropertyDeclarations */
export const props = {
  employee: {type: Object, attribute: false},
  selected: {type: Boolean, reflect: true},
};

export const defaultProps = {
  employee: null,
  selected: false,
};
