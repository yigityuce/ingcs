/** @type import('lit').PropertyDeclarations */
export const props = {
  type: {type: String, reflect: true}, // e.g., 'button', 'submit', 'reset'
  variant: {type: String, reflect: true}, // e.g., 'outlined', 'contained', 'text',
  color: {type: String, reflect: true}, // e.g., 'primary', 'secondary',
  fullWidth: {type: Boolean, reflect: true},
};

export const defaultProps = {
  type: 'button',
  variant: 'contained',
  color: 'primary',
  fullWidth: false,
};
