/** @type import('lit').PropertyDeclarations */
export const props = {
  color: {type: String, reflect: true}, // color: 'primary', 'secondary', 'error', 'warning', 'success'
  size: {type: String, reflect: true}, // size of the icon, e.g., 'small', 'medium', 'large'
};

export const defaultProps = {
  color: 'primary',
  size: 'medium',
};
