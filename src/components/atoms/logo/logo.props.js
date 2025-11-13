/** @type import('lit').PropertyDeclarations */
export const props = {
  size: {type: String, reflect: true}, // type: 'small', 'medium', 'large'
};

export const defaultProps = {
  size: 'medium', // Default size
};
