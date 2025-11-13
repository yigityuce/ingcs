/** @type import('lit').PropertyDeclarations */
export const props = {
  currentPage: {type: Number}, // index starts at 1
  totalPages: {type: Number},
  visiblePageCountAroundCurrent: {type: Number},
};

export const defaultProps = {
  currentPage: 1,
  totalPages: 1,
  visiblePageCountAroundCurrent: 2,
};
