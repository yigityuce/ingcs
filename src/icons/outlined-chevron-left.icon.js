import {html} from 'lit';
import {classNames, IngIconBase} from '../components/atoms/icon';

export class IngIconOutlinedChevronLeft extends IngIconBase {
  render() {
    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="48px"
        viewBox="0 0 24 24"
        width="48px"
        fill="var(--fill-color, #000000)"
        class=${classNames.icon}
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" />
      </svg>
    `;
  }
}

window.customElements.define(
  'ing-icon-outlined-chevron-left',
  IngIconOutlinedChevronLeft
);
