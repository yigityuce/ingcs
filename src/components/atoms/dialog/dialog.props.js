/** @type import('lit').PropertyDeclarations */
export const props = {
  open: {type: Boolean, reflect: true},
  size: {type: String, reflect: true}, // small, medium, large, auto
};

export const defaultProps = {
  open: false,
  size: 'medium', // Default size
};
