import {css} from 'lit';

export const styles = css`
  :host {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
  }

  :host(:focus-visible) {
    outline: none;
  }

  :host([noWrap]) {
    white-space: nowrap;
  }

  /* VARIANT styles */
  :host([variant='title1']) {
    font-size: 3rem;
    font-weight: 400;
    line-height: 1.25rem;
  }
  :host([variant='title2']) {
    font-size: 2.5rem;
    font-weight: 400;
    line-height: 1.25rem;
  }
  :host([variant='title3']) {
    font-size: 2rem;
    font-weight: 400;
    line-height: 1.25rem;
  }
  :host([variant='title4']) {
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 1.25rem;
  }
  :host([variant='title5']) {
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 1.25rem;
  }
  :host([variant='title6']) {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.25rem;
  }
  :host([variant='body1']) {
    font-size: 1rem;
    font-weight: 300;
    line-height: 1rem;
  }
  :host([variant='body2']) {
    font-size: 0.8rem;
    font-weight: 300;
    line-height: 1rem;
  }

  /* STRONG styles */
  :host([strong]) {
    font-weight: 500;
  }
  :host([variant^='title'][strong]) {
    font-weight: 600;
  }

  /* EMPHASIZED styles */
  :host([emphasized]) {
    font-style: italic;
  }

  /* COLOR styles */
  :host([color='inherit']) {
    color: inherit;
  }
  :host([color='primary']) {
    color: var(--ing-color-text-primary);
  }
  :host([color='secondary']) {
    color: var(--ing-color-text-secondary);
  }
  :host([color='error']) {
    color: var(--ing-color-error-main);
  }
  :host([color='warning']) {
    color: var(--ing-color-warning-main);
  }
  :host([color='success']) {
    color: var(--ing-color-success-main);
  }
  :host([color='disabled']) {
    color: var(--ing-color-text-disabled);
  }
`;
