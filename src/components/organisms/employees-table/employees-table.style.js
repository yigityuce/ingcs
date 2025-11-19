import {css, unsafeCSS} from 'lit';

export const classNames = {
  table: 'table',
  row: 'row',
  cell: 'cell',
  tableHeader: 'table-header',
  actions: 'actions',
  empty: 'empty',
};

export const styles = css`
  :host {
    --col-count: 10;
    display: flex;
    flex-direction: column;
    max-height: 100%;
    flex-grow: 1;
    overflow: hidden;
  }

  .${unsafeCSS(classNames.table)} {
    display: grid;
    grid-template-columns: min-content repeat(calc(var(--col-count) - 2), 1fr) min-content;
    column-gap: var(--ing-size-gap-x-large);
    position: relative;
    overflow: auto;
    max-height: 100%;
    align-content: flex-start;
  }

  .${unsafeCSS(classNames.row)} {
    height: fit-content;
    display: grid;
    grid-template-columns: subgrid;
    grid-column: span var(--col-count);
    border-bottom: 1px solid var(--ing-color-grey-200);
    place-items: center;
    padding: var(--ing-size-spacing-large);
  }

  .${unsafeCSS(classNames.tableHeader)} {
    top: 0;
    position: sticky;
    z-index: 3;
    background-color: var(--ing-color-background-surface);
  }

  .${unsafeCSS(classNames.actions)} {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .${unsafeCSS(classNames.empty)} {
    grid-column: span var(--col-count);
    place-self: center;
    padding: var(--ing-size-spacing-large);
    display: flex;
    box-sizing: border-box;
    place-self: center;
    align-items: center;
    justify-content: center;
    min-height: 300px;
    max-width: 100%;
  }
`;
