import {LitElement, html, css} from 'lit';
import {when} from 'lit/directives/when.js';
import {classMap} from 'lit/directives/class-map.js';

import '../../atoms/typography';
import '../../atoms/icon-button';
import {repeat} from 'lit/directives/repeat.js';

export class IngPagination extends LitElement {
  /**
   * @type import('lit').PropertyDeclarations
   */
  static get properties() {
    return {
      currentPage: {type: Number}, // index starts at 1
      totalPages: {type: Number},
      visiblePageCountAroundCurrent: {type: Number},
      _leftButtons: {type: Array},
      _middleButtons: {type: Array},
      _rightButtons: {type: Array},
    };
  }

  /**
   * @type import('lit').CSSResultGroup
   */
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: var(--ing-size-gap-medium);
      }

      .item {
        padding: var(--ing-size-spacing-small);
      }

      .active {
        background-color: var(--ing-color-brand);
        color: var(--ing-color-white);
      }
    `;
  }

  willUpdate(changedProperties) {
    if (
      changedProperties.has('currentPage') ||
      changedProperties.has('totalPages') ||
      changedProperties.has('visiblePageCountAroundCurrent')
    ) {
      const totalNumberOfMiddleButtons =
        this.visiblePageCountAroundCurrent * 2 + 1;
      this._middleButtons = [this.currentPage];

      for (
        let i = 1;
        i <= this.visiblePageCountAroundCurrent &&
        this.currentPage - i >= 1 &&
        this._middleButtons.length < totalNumberOfMiddleButtons;
        i++
      ) {
        this._middleButtons.unshift(this.currentPage - i);
      }
      for (
        let i = 1;
        this.currentPage + i <= this.totalPages &&
        this._middleButtons.length < totalNumberOfMiddleButtons;
        i++
      ) {
        this._middleButtons.push(this.currentPage + i);
      }
      if (!this._middleButtons.includes(1)) {
        this._leftButtons = [1];
      } else {
        this._leftButtons = [];
      }
      if (!this._middleButtons.includes(this.totalPages)) {
        this._rightButtons = [this.totalPages];
      } else {
        this._rightButtons = [];
      }
    }
  }

  _dispatchPageChange(pageNumber) {
    this.dispatchEvent(
      new CustomEvent('page-change', {
        detail: Math.min(this.totalPages, Math.max(1, pageNumber)),
      })
    );
  }

  _pageNumberRenderer(pageNumber) {
    return html`<ing-icon-button
      class=${classMap({item: true, active: pageNumber === this.currentPage})}
      @click=${() => {
        this._dispatchPageChange(pageNumber);
      }}
    >
      <ing-typography
        variant="body1"
        color="inherit"
        ?strong=${pageNumber === this.currentPage}
      >
        ${pageNumber}
      </ing-typography>
    </ing-icon-button>`;
  }

  render() {
    return html`
      <ing-icon-button
        ?disabled=${this.currentPage === 1}
        @click=${() => {
          this._dispatchPageChange(this.currentPage - 1);
        }}
      >
        <ing-icon-outlined-chevron-left
          color=${this.currentPage === 1 ? 'disabled' : 'secondary'}
        >
        </ing-icon-outlined-chevron-left>
      </ing-icon-button>
      ${when(
        this._leftButtons.length > 0,
        () =>
          html`${repeat(
            this._leftButtons,
            (i) => i,
            (i) => html`${this._pageNumberRenderer(i)}`
          )}`,
        () => html``
      )}
      ${when(
        this._leftButtons.length &&
          this._leftButtons[this._leftButtons.length - 1] + 1 !==
            this._middleButtons[0],
        () => html`<ing-icon-button disabled>...</ing-icon-button>`,
        () => html``
      )}
      ${when(
        this._middleButtons.length > 0,
        () =>
          html`${repeat(
            this._middleButtons,
            (i) => i,
            (i) => html`${this._pageNumberRenderer(i)}`
          )}`,
        () => html``
      )}
      ${when(
        this._rightButtons.length &&
          this._rightButtons[0] - 1 !==
            this._middleButtons[this._middleButtons.length - 1],
        () => html`<ing-icon-button disabled>...</ing-icon-button>`,
        () => html``
      )}
      ${when(
        this._rightButtons.length > 0,
        () =>
          html`${repeat(
            this._rightButtons,
            (i) => i,
            (i) => html`${this._pageNumberRenderer(i)}`
          )}`,
        () => html``
      )}
      <ing-icon-button
        ?disabled=${this.currentPage === this.totalPages}
        @click=${() => {
          this._dispatchPageChange(this.currentPage + 1);
        }}
      >
        <ing-icon-outlined-chevron-left
          color=${this.currentPage === this.totalPages
            ? 'disabled'
            : 'secondary'}
          style="transform: rotate(180deg);"
        >
        </ing-icon-outlined-chevron-left>
      </ing-icon-button>
    `;
  }
}

window.customElements.define('ing-pagination', IngPagination);
