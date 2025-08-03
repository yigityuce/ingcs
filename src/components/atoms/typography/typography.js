import {LitElement, html, css} from 'lit';

export class IngTypography extends LitElement {
  /**
   * @type import('lit').PropertyDeclarations
   */
  static get properties() {
    return {
      variant: {type: String, reflect: true}, // type: 'title1', 'title2', 'title3', 'title4', 'title5', 'title6', 'body1', 'body2', 'caption'
      color: {type: String, reflect: true}, // type: 'primary', 'secondary', 'error', 'warning', 'success'
      strong: {type: Boolean, reflect: true},
      emphasized: {type: Boolean, reflect: true},
    };
  }

  /**
   * @type import('lit').CSSResultGroup
   */
  static get styles() {
    return css`
      :host {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
          Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
          sans-serif; // TODO: Change to the correct font family
      }

      /* VARIANT styles */
      :host([variant='title1']) {
        font-size: 3rem;
        font-weight: 500;
        line-height: 1.25rem;
      }
      :host([variant='title2']) {
        font-size: 2.5rem;
        font-weight: 500;
        line-height: 1.25rem;
      }
      :host([variant='title3']) {
        font-size: 2rem;
        font-weight: 500;
        line-height: 1.25rem;
      }
      :host([variant='title4']) {
        font-size: 1.5rem;
        font-weight: 500;
        line-height: 1.25rem;
      }
      :host([variant='title5']) {
        font-size: 1.25rem;
        font-weight: 500;
        line-height: 1.25rem;
      }
      :host([variant='title6']) {
        font-size: 1rem;
        font-weight: 500;
        line-height: 1.25rem;
      }
      :host([variant='title6']) {
        font-size: 1rem;
        font-weight: 500;
        line-height: 1.25rem;
      }
      :host([variant='body1']) {
        font-size: 1rem;
        font-weight: 400;
        line-height: 1rem;
      }
      :host([variant='body2']) {
        font-size: 0.8rem;
        font-weight: 400;
        line-height: 1rem;
      }

      /* STRONG styles */
      :host([strong]) {
        font-weight: 600;
      }
      :host([variant^='title'][strong]) {
        font-weight: 700;
      }

      /* EMPHASIZED styles */
      :host([emphasized]) {
        font-style: italic;
      }

      /* COLOR styles */
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
    `;
  }

  constructor() {
    super();
    this.variant = 'body1';
    this.color = 'primary';
    this.strong = false;
    this.emphasized = false;
  }

  render() {
    return html` <slot></slot> `;
  }
}

window.customElements.define('ing-typography', IngTypography);
