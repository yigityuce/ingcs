import {css, unsafeCSS} from 'lit';

export const classNames = {
  content: 'content',
};

export const styles = css`
  :host {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: fit-content;
    height: fit-content;
    min-height: 2rem;
    cursor: pointer;
    white-space: nowrap;
    gap: var(--ing-size-gap-medium);
    border-radius: var(--ing-size-radius-medium);
    position: relative;
    outline: none;
  }

  :host([fullWidth]) {
    width: 100%;
  }

  button {
    all: unset;
    box-sizing: border-box;
    display: flex;
    background-color: inherit;
    color: inherit;
    align-items: inherit;
    justify-content: inherit;
    gap: inherit;
    border: none;
    border-radius: inherit;
    cursor: inherit;
    white-space: inherit;
    height: 100%;
    width: 100%;
    padding: var(--ing-size-spacing-small);

    .${unsafeCSS(classNames.content)} {
      z-index: 2;
    }

    &:focus-visible {
      outline: var(--ing-size-outline-medium) solid var(--ing-color-brand);
      outline-offset: 3px;
    }
  }

  :host([color='secondary']) {
    button {
      &:focus-visible {
        outline-color: var(--ing-color-brand-alt);
      }
    }
  }

  :host([variant='contained'][color='primary']) {
    background-color: var(--ing-color-brand);
    color: var(--ing-color-white);
  }
  :host([variant='contained'][color='secondary']) {
    background-color: var(--ing-color-brand-alt);
    color: var(--ing-color-white);
  }

  :host([variant='outlined'][color='primary']) {
    border: var(--ing-size-outline-small) solid var(--ing-color-brand);
    color: var(--ing-color-brand);
    background-color: transparent;
  }
  :host([variant='outlined'][color='secondary']) {
    border: var(--ing-size-outline-small) solid var(--ing-color-brand-alt);
    color: var(--ing-color-brand-alt);
    background-color: transparent;
  }

  :host([variant='text'][color='primary']) {
    color: var(--ing-color-brand);
    background-color: transparent;
  }
  :host([variant='text'][color='secondary']) {
    color: var(--ing-color-brand-alt);
    background-color: transparent;
  }

  :host(:hover)::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: inherit;
  }
`;
