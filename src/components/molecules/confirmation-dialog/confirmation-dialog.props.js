import {
  props as dialogProps,
  defaultProps as defaultDialogProps,
} from '../../atoms/dialog';

/** @type import('lit').PropertyDeclarations */
export const props = {
  ...dialogProps,
  confirmText: {type: String},
  cancelText: {type: String},
};

export const defaultProps = {
  ...defaultDialogProps,
  confirmText: null,
  cancelText: null,
};
