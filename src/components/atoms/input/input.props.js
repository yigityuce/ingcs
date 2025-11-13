/** @type import('lit').PropertyDeclarations */
export const props = {
  disabled: {type: Boolean, reflect: true},
  required: {type: Boolean, reflect: true},
  type: {type: String, reflect: true}, // e.g., 'text', 'password', 'date', 'email',
  name: {type: String, reflect: true},
  value: {type: String},
  label: {type: String, reflect: true},
  placeholder: {type: String, reflect: true},
  form: {type: String, reflect: true},
  options: {type: Array, attribute: false}, // Array<{ value: string, label: TemplateResult<1> }>
};

export const defaultProps = {
  disabled: false,
  required: false,
  type: 'text',
  name: '',
  value: '',
  label: '',
  placeholder: '',
  options: [],
};
