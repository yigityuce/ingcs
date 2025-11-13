/** @type import('lit').PropertyDeclarations */
export const props = {
  variant: {type: String, reflect: true}, // type: 'title1', 'title2', 'title3', 'title4', 'title5', 'title6', 'body1', 'body2', 'caption'
  color: {type: String, reflect: true}, // type: 'primary', 'secondary', 'error', 'warning', 'success', 'disabled', 'inherit'
  strong: {type: Boolean, reflect: true},
  emphasized: {type: Boolean, reflect: true},
  noWrap: {type: Boolean, reflect: true}, // Prevents text from wrapping
};

export const defaultProps = {
  variant: 'body1',
  color: 'primary',
  strong: false,
  emphasized: false,
  noWrap: false,
};
