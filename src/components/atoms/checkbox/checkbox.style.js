import {css, unsafeCSS} from 'lit';

export const classNames = {
  checkbox: 'checkbox',
  icon: 'icon',
};

export const styles = css`
  :host {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: fit-content;
    height: fit-content;
    cursor: pointer;
    gap: var(--ing-size-gap-medium);
    position: relative;
    z-index: 2;

    input {
      visibility: hidden;
      max-width: 0;
      max-height: 0;
      position: absolute;
    }
  }

  ${unsafeCSS(`.${classNames.checkbox}`)} {
    width: 1.25rem;
    height: 1.25rem;
    border: 1.5px solid var(--ing-color-brand);
    border-radius: var(--ing-size-radius-small);
    box-sizing: border-box;
    background-color: transparent;
    transition: background-color 0.2s, border-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    position: relative;

    ${unsafeCSS(`.${classNames.icon}`)} {
      --icon-size: 1.125rem;
    }
  }

  :host(:hover) {
    ${unsafeCSS(`.${classNames.checkbox}`)} {
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, 0.05);
        z-index: -1;
      }
    }
  }

  :host([disabled]) {
    pointer-events: none;
    cursor: not-allowed;

    ${unsafeCSS(`.${classNames.checkbox}`)} {
      border-color: var(--ing-color-grey-400);
    }
  }
`;
