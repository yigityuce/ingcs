import {html} from 'lit';
import {classNames, IngIconBase} from '../components/atoms/icon';

export class IngIconOutlinedList extends IngIconBase {
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
        <path d="M2 16v2h20v-2H2zm0-5v2h20v-2H2zm0-5v2h20V6H2z" />
      </svg>
    `;
  }
}

window.customElements.define('ing-icon-outlined-list', IngIconOutlinedList);
