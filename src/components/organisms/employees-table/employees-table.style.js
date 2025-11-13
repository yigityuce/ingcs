import {css, unsafeCSS} from 'lit';

export const classNames = {
  table: 'table',
  row: 'row',
  cell: 'cell',
  tableHeader: 'table-header',
  actions: 'actions',
};

export const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    max-height: 100%;
    overflow: hidden;
  }

  .${unsafeCSS(classNames.table)} {
    display: grid;
    grid-template-columns: min-content repeat(8, 1fr) min-content;
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
    grid-column: span 10;
    border-bottom: 1px solid var(--ing-color-grey-200);
    place-items: center;
    padding: var(--ing-size-spacing-large) var(--ing-size-spacing-small);
  }

  .${unsafeCSS(classNames.tableHeader)} {
    top: 0;
    position: sticky;
    z-index: 2;
    background-color: var(--ing-color-background-surface);
  }

  .${unsafeCSS(classNames.actions)} {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;
