import {LitElement, html} from 'lit';
import {createRef, ref} from 'lit/directives/ref.js';
import Lottie from 'lottie-web/build/player/esm/lottie.min.js';
import {styles} from './no-data.style';

export class IngNoData extends LitElement {
  _animationElementRef = createRef();

  /** @type import('lit').CSSResultGroup */
  static styles = [styles];

  /** @type import('lit').PropertyDeclarations */
  static properties = {};

  firstUpdated() {
    Lottie.loadAnimation({
      container: this._animationElementRef.value,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'static/no-data.json', // the animation data
    });
  }

  render() {
    return html`
      <div ref=${ref(this._animationElementRef)}></div>
      <slot></slot>
    `;
  }
}

window.customElements.define('ing-no-data', IngNoData);
