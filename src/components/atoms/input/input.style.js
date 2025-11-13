import {css, unsafeCSS} from 'lit';

export const classNames = {
  native: 'native-input',
  invalid: 'invalid',
  label: 'label',
  assistiveText: 'assistive-text',
};

export const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }
  :host([disabled]) {
    cursor: default;
    pointer-events: none;
  }

  label {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas:
      'label'
      'native-input'
      'assistive-text';
    color: var(--ing-color-text-primary);
  }

  .${unsafeCSS(classNames.label)} {
    grid-area: label;
    margin-bottom: var(--ing-size-gap-large);
  }

  .${unsafeCSS(classNames.assistiveText)} {
    grid-area: assistive-text;
    min-height: 1rem;
    margin-top: var(--ing-size-gap-small);
    color: var(--ing-color-text-disabled);
  }

  .${unsafeCSS(classNames.native)} {
    grid-area: native-input;
    width: 100%;
    box-sizing: border-box;
    padding: var(--ing-size-spacing-small);
    border: none;
    outline: 1px solid var(--ing-color-grey-500);
    border-radius: var(--ing-size-radius-small);
    font-size: 1rem;
    color: var(--ing-color-text-primary);
    min-height: 3rem;
    --default-icon-color: var(--ing-color-grey-800);

    &:focus {
      outline-color: var(--ing-color-brand);
      & + .${unsafeCSS(classNames.label)} {
        color: var(--ing-color-brand);
      }
    }

    &.${unsafeCSS(classNames.invalid)} {
      outline-color: var(--ing-color-error-dark);
      outline-width: 2px;
      & ~ .${unsafeCSS(classNames.label)} {
        color: var(--ing-color-error-dark);
      }

      & ~ .${unsafeCSS(classNames.assistiveText)} {
        color: var(--ing-color-error-dark);
      }
    }
  }

  select {
    appearance: none;
    cursor: pointer;
    background-image: url('data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9L12 15L18 9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"/></svg>');
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 1.25rem;
  }

  input[type='date']::-webkit-calendar-picker-indicator {
    appearance: none;
    cursor: pointer;
    background-repeat: no-repeat;
    background-position: right center;
    background-size: 1.25rem 1.25rem;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><g><rect fill="none" height="24" width="24"/></g><g><path d="M19,4h-1V2h-2v2H8V2H6v2H5C3.89,4,3.01,4.9,3.01,6L3,20c0,1.1,0.89,2,2,2h14c1.1,0,2-0.9,2-2V6C21,4.9,20.1,4,19,4z M19,20 H5V10h14V20z M9,14H7v-2h2V14z M13,14h-2v-2h2V14z M17,14h-2v-2h2V14z M9,18H7v-2h2V18z M13,18h-2v-2h2V18z M17,18h-2v-2h2V18z"/></g></svg>');
  }
`;
