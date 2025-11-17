import {html} from 'lit';
import {classNames, IngIconBase} from '../components/atoms/icon';

export class IngIconOutlinedMinus extends IngIconBase {
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
        <path d="M215-433v-94h531v94H215Z" />
      </svg>
    `;
  }
}

window.customElements.define('ing-icon-outlined-minus', IngIconOutlinedMinus);
