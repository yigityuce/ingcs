import {css} from 'lit';
export const iconStyles = css`
  :host {
    width: clamp(var(--icon-size), var(--icon-size), var(--icon-size));
    height: clamp(var(--icon-size), var(--icon-size), var(--icon-size));
    display: inline-flex;
  }

  /* COLOR styles */
  :host([color='primary']) {
    color: var(--ing-color-text-primary);
    fill: var(--ing-color-text-primary);
    --fill-color: var(--ing-color-text-primary);
  }
  :host([color='secondary']) {
    color: var(--ing-color-text-secondary);
    fill: var(--ing-color-text-secondary);
    --fill-color: var(--ing-color-text-secondary);
  }
  :host([color='error']) {
    color: var(--ing-color-error-main);
    fill: var(--ing-color-error-main);
    --fill-color: var(--ing-color-error-main);
  }
  :host([color='warning']) {
    color: var(--ing-color-warning-main);
    fill: var(--ing-color-warning-main);
    --fill-color: var(--ing-color-warning-main);
  }
  :host([color='success']) {
    color: var(--ing-color-success-main);
    fill: var(--ing-color-success-main);
    --fill-color: var(--ing-color-success-main);
  }
  :host([color='disabled']) {
    color: var(--ing-color-grey-400);
    fill: var(--ing-color-grey-400);
    --fill-color: var(--ing-color-grey-400);
  }

  /* SIZE styles */
  :host([size='small']) {
    --icon-size: 1rem;
  }
  :host([size='medium']) {
    --icon-size: 1.5rem;
  }
  :host([size='large']) {
    --icon-size: 2rem;
  }

  .icon {
    height: inherit;
    width: inherit;
    font-size: var(--icon-size, 1.5rem);
    display: inline-block;
    background-repeat: no-repeat;
    background-size: contain;
  }
`;
