import {VIEW_MODES} from '../../../models';

/** @type import('lit').PropertyDeclarations */
export const props = {
  viewMode: {type: String, reflect: true}, // 'table', 'grid'
};

export const defaultProps = {
  viewMode: VIEW_MODES.TABLE,
};
