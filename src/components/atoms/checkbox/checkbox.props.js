/** @type import('lit').PropertyDeclarations */
export const props = {
  state: {type: String, reflect: true}, // e.g., 'checked', 'unchecked', 'indeterminate',
  disabled: {type: Boolean, reflect: true},
};

export const defaultProps = {
  state: 'unchecked',
  disabled: false,
};
