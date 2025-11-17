import {html} from 'lit';
import {classNames, IngIconBase} from '../components/atoms/icon';

export class IngIconOutlinedCheck extends IngIconBase {
  render() {
    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="48px"
        viewBox="0 -960 960 960"
        width="48px"
        fill="var(--fill-color, #000000)"
        class=${classNames.icon}
      >
        <path d="M378-222 130-470l68-68 180 180 383-383 68 68-451 451Z" />
      </svg>
    `;
  }
}

window.customElements.define('ing-icon-outlined-check', IngIconOutlinedCheck);
