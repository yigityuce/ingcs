/** @type import('lit').PropertyDeclarations */
export const props = {
  disabled: {type: Boolean, reflect: true},
  required: {type: Boolean, reflect: true},
  type: {type: String, reflect: true}, // e.g., 'text', 'password', 'date', 'email',
  name: {type: String, reflect: true},
  initialValue: {type: String},
  label: {type: String, reflect: true},
  placeholder: {type: String, reflect: true},
  form: {type: String, reflect: true},
  minlength: {type: Number, reflect: true},
  maxlength: {type: Number, reflect: true},
  min: {type: Number, reflect: true},
  max: {type: Number, reflect: true},
  pattern: {type: Number, reflect: true},
  step: {type: Number, reflect: true},
  options: {type: Array, attribute: false}, // Array<{ value: string, label: TemplateResult<1> }>
  validationTrigger: {type: Array, attribute: false}, // e.g., 'input', 'change', 'blur'
  customValidator: {type: Function, attribute: false}, // (input: HTMLInputElement | HTMLSelectElement, form: HTMLFormElement) => string | null
  maskOptions: {type: Object, attribute: false}, // Options for input masking, @type import('@maskito/core').MaskitoOptions
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
  validationTrigger: ['input', 'change', 'blur'],
  minlength: undefined,
  maxlength: undefined,
  min: undefined,
  max: undefined,
  pattern: undefined,
  step: undefined,
  maskOptions: undefined,
};
