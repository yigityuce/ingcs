```js
import {LitElement, css, html} from 'lit';

export class TestComponent extends LitElement {
  static properties = {
    prop1: {},
  };
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    :host {
      color: blue;
    }
  `;

  constructor() {
    super();
    // Declare reactive properties
    this.prop1 = 'value';
  }

  // Render the UI as a function of component state
  render() {
    return html`<div>Prop1: ${this.prop1}</div>`;
  }
}
customElements.define('test-component', TestComponent);
```

# Features

- Batch update
- Partial re-render
- Shadow-DOM always
-

<br /><br /><br /><br />

# Key Notes

- to use any other custom components in the component, it **needs to be imported**

<br /><br /><br /><br />

# API

## Component

### ComponentClass.render()

- Composable
- Returns:
  - Primitives
  - `TemplateResult` object
  - DOM Node
  - Sentinel values: `nothing` and `noChange`
  - Array of those types above

#### Best Practices

- do NOT change state
- no side effects
- only use inputs
- pure function

### ComponentClass.properties (Reactive Properties)

- Generates getter/setter for each property
- attribute changes are **automatically** reflected to properties
- property changes **optionally** can be reflected to attributes
- **inherits** properties
- some of the properties can be marked as **state**
- property options:

```js
{
        // type of prop. it will be used while converting attr. to prop.
        // can be: String, Number, Boolean, Array, and Object
        type: String,

        // boolean or string -> associate with attr. or custom name
        attribute: true,

        // reflect back prop. value to attr.
        reflect: false,

        // prevents prop's default values to be reflected to attr.
        // also use prop's default value when the attr. is removed
        useDefault: false,

        // declare as internal reactive state, does NOT generate an attr.
        state: false,

        // to avoid auto accessor generation, why we need this??
        noAccessor: false,

        // defines how to convert values from/to attribute
        converter: {
            fromAttribute: (value, type) => {},
            toAttribute: (value, type) => {}
        },

        // callback to determine prop is changed
        hasChanged(newVal, oldVal) {
            return JSON.stringify(newVal) === JSON.stringify(oldVal);
        }
    }

```

#### Mutate object and array props

- use immutable data pattern: `Array.filter` etc.
- use `immer`
- call `this.requestUpdate()` after mutation
  - only re-render current component
  - sub components where mutated props are used won't be re-rendered

## Styles

```js
export class MyElement extends LitElement {
  static styles = css`
    p {
      color: green;
    }
  `;
}
```

- Automatically **scoped**
- `static styles` class field can be single css or array of css definitions
- nested expressions can only be `css` tagged strings
  - as a workaround `unsafeCSS` method can be used

```js
const mainColor = css`red`;
const bgColor = 'yellow';
...
static styles = css`
  div { color: ${mainColor}; background-color: ${unsafeCSS(bgColor)} }
`;

```

- sharing styles:
  - define styles within a separate file
  - import file
  - add to `static styles` as array item

```js
import {buttonStyles} from './button-styles.js';

class MyElement extends LitElement {
  static styles = [
    buttonStyles,
    css`
      :host {
        display: block;
        border: 1px solid black;
      }
    `,
  ];
}
```

- special selectors:

  - `:host` and `:host()`
  - `:slotted(*)` and `:slotted(selector)`

- utility directives:
  - `classMap` and `styleMap`
  - should be imported:

```js
import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';
```

## Lifecycle

### Methods

- `constructor()`
  - on element is created
- `connectedCallback()`
  - on element is added to the DOM
- `disconnectedCallback()`
  - on element is removed from the DOM
- `attributeChangedCallback()`
  - on element's observed attribute is changed
- `shouldUpdate(changedProperties: Map) => boolean`
- `willUpdate(changedProperties: Map)`
- `firstUpdated(changedProperties: Map)`
  - only called after component's DOM is updated for the first time
  - use case: focusing an element
- `updated(changedProperties: Map)`

### Manual Trigger

- call `requestUpdate()` method

### `updateComplete` Promise

- By default, the updateComplete promise resolves when the element's update has completed
- does NOT wait for any children to have completed their update
- his behavior may be customized by overriding `getUpdateComplete`

### `hasUpdated` Property

- returns true if the component has updated at least once

### Override `updateComplete` Behavior

- override `getUpdateComplete()` method

```js
class MyElement extends LitElement {
  async getUpdateComplete() {
    const result = await super.getUpdateComplete();
    await this._myChild.updateComplete;
    return result;
  }
}
```

## Shadow DOM

### Query component's children

- `this.renderRoot.querySelector()`

### Customizing the render root

- set `shadowRootOptions`:
  - check https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow#parameters

```js
class DelegatesFocus extends LitElement {
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    mode: 'open',
    clonable: false,
    delegatesFocus: false,
    serializable: false,
    slotAssignment: 'named',
  };
}
```

## Events

### Template Binding

- use `@` expression

```js
import {LitElement, html} from 'lit';

export class MyElement extends LitElement {
  static properties = {
    count: {type: Number},
  };

  constructor() {
    super();
    this.count = 0;
  }

  render() {
    return html`
      <button @click="${this._increment}">Click Me!</button>
      <button @click=${{handleEvent: () => this._added(), once: true}}>
        click
      </button>
      <p>Click count: ${this.count}</p>
    `;
  }

  _increment(e) {
    this.count++;
  }

  _added(e) {
    console.log('Element added to basket');
    this.count++;
  }
}
customElements.define('my-element', MyElement);
```

### Event listener for component itself or slotted elements

- listeners should be added via `this.addEventListener` within constructor
- extract source element in handler to decide where the event is emitted
- **Retargeting**: be aware that while the event is propagated outside of the custom component, target will be set to the custom component, not the internal element within the custom component

### Event listener for global objects

- `window`, `document` etc
- should be added via `this.addEventListener` within `connectedCallback()` and removed within `disconnectedCallback()`

### Dispatching

- use `this.dispatchEvent()`
- By default, an event dispatched inside a shadow root **will not be visible outside that shadow root.**
- To make an event pass through shadow DOM boundaries, you must set the `composed` property to `true`.
- It's common to pair `composed` with `bubbles` so that all nodes in the DOM tree can see the event

## Templates

### Expressions

- Attributes
  - always string

```js
html`<div class=${highlightClass}></div>`;
```

- Booleans
  - renders if truthy

```js
html`<div ?hidden=${!show}></div>`;
```

- Properties
  - Can be used to pass **complex data** down the tree to subcomponents

```js
html`<input .value=${value} />`;
```

- Events

```js
html`<button @click=${this._clickHandler}>Go</button>`;
```

- Directives

```js
html`<input ${ref(inputRef)} />`;
```

### `nothing`

```js
html`<img
  src="/images/${this.imagePath ?? nothing}/${this.imageFile ?? nothing}"
/>`;
```

- In this example **both** the `this.imagePath` and `this.imageFile` properties must be defined for the src attribute to be set
- Also `ifDefined` directive is provided which is sugar for `value ?? nothing`

```js
html`<img
  src="/images/${ifDefined(this.imagePath)}/${ifDefined(this.imageFile)}"
/>`;
```

### Built-in Directives

#### `ref`

- Retrieves a reference to an element rendered into the DOM.

```js
class MyElement extends LitElement {

  inputRef = createRef();

  render() {
    // Passing ref directive a Ref object that will hold the element in .value
    return html`<input ${ref(this.inputRef)}>`;
  }

  firstUpdated() {
    const input = this.inputRef.value!;
    input.focus();
  }
}
customElements.define('my-element', MyElement);
```

#### `classMap`

- uses the `element.classList` API to efficiently add and remove classes to an element based on an object passed by the user.
- Each key in the object is treated as a class name, and if the value associated with the key is truthy, that class is added to the element.
- On subsequent renders, any previously set classes that are falsy or no longer in the object are removed.

```js
class MyElement extends LitElement {
  static properties = {
    enabled: {type: Boolean},
  };

  constructor() {
    super();
    this.enabled = false;
  }

  render() {
    const classes = {enabled: this.enabled, hidden: false};
    return html`<div class=${classMap(classes)}>Classy text</div>`;
  }
}
```

#### `when`

- as conditionals' alternative

```js
class MyElement extends LitElement {
  render() {
    return html`
      ${when(
        this.user,
        () => html`User: ${this.user.username}`,
        () => html`Sign In...`
      )}
    `;
  }
}
```

#### `choose`

- as **switch** statement

```js
class MyElement extends LitElement {
  render() {
    return html`
      ${choose(
        this.section,
        [
          ['home', () => html`<h1>Home</h1>`],
          ['about', () => html`<h1>About</h1>`],
        ],
        () => html`<h1>Error</h1>`
      )}
    `;
  }
}
```

#### `map`

- always updates any DOM created in place
- it does not do any diffing or DOM movement

```js
class MyElement extends LitElement {
  render() {
    return html`
      <ul>
        ${map(items, (i) => html`<li>${i}</li>`)}
      </ul>
    `;
  }
}
```

#### `repeat`

- Method signature: `repeat(items, keyFunction, itemTemplate)`
- **Does NOT recreate DOM nodes, instead it moves them**

```js
import {LitElement, html} from 'lit';
import {repeat} from 'lit/directives/repeat.js';

class MyElement extends LitElement {
  static properties = {
    employees: {},
  };

  constructor() {
    super();
    this.employees = [
      {id: 0, givenName: 'Fred', familyName: 'Flintstone'},
      {id: 1, givenName: 'George', familyName: 'Jetson'},
      {id: 2, givenName: 'Barney', familyName: 'Rubble'},
      {id: 3, givenName: 'Cosmo', familyName: 'Spacely'},
    ];
  }

  render() {
    return html`
      <ul>
        ${repeat(
          this.employees,
          (employee) => employee.id,
          (employee, index) => html`
            <li>${index}: ${employee.familyName}, ${employee.givenName}</li>
          `
        )}
      </ul>
    `;
  }
}
```

#### `join`

```js
class MyElement extends LitElement {
  render() {
    return html`
      ${join(
        map(menuItems, (i) => html`<a href=${i.href}>${i.label}</a>`),
        html`<span class="separator">|</span>`
      )}
    `;
  }
}
```

#### `range`

```js
class MyElement extends LitElement {
  render() {
    return html` ${map(range(0, 8, 1), (i) => html`${i + 1}`)} `;
  }
}
```

#### `ifDefined`

- Sets an attribute if the value is defined and removes the attribute if undefined.

```js
class MyElement extends LitElement {
  render() {
    // src attribute not rendered if either size or filename are undefined
    return html`<img
      src="/images/${ifDefined(this.size)}/${ifDefined(this.filename)}"
    />`;
  }
}
```

#### `cache`

- if you're switching between large, complicated templates, you might want to save the cost of recreating DOM on each switch

```js
render() {
  return html`${cache(this.userName ?
    html`Welcome ${this.userName}`:
    html`Please log in <button>Login</button>`)
  }`;
}
```

#### `keyed`

- Associates a renderable value with a unique key.
- When the key changes, the previous DOM is **removed and disposed** before rendering the next value, even if the value—such as a template—is the same.
- Useful when you're rendering stateful elements and you need to ensure that all state of the element is cleared when some critical data changes

```js
class MyElement extends LitElement {
  static properties = {
    userId: {},
  };

  constructor() {
    super();
    this.userId = '';
  }

  render() {
    return html` <div>
      ${keyed(
        this.userId,
        html`<user-card .userId=${this.userId}></user-card>`
      )}
    </div>`;
  }
}
```

#### `guard`

- Only re-evaluates the template when one of its dependencies changes

```js
class MyElement extends LitElement {
  static properties = {
    value: {},
  };

  constructor() {
    super();
    this.value = '';
  }

  render() {
    return html` <div>
      ${guard([this.value], () => calculateSHA(this.value))}
    </div>`;
  }
}
```

#### `live`

- Sets an attribute or property if it differs from the **live DOM** value rather than the **last-rendered** value.
- When determining whether to update the value, checks the expression value against the live DOM value, instead of Lit's default behavior of checking against the last set value.
- This is useful for cases where the DOM value may change from outside of Lit.
- For example, when using an expression to set an `<input>` element's value property, a content editable element's text, or to a custom element that changes its own properties or attributes.

```js
class MyElement extends LitElement {
  static properties = {
    data: {},
  };

  constructor() {
    super();
    this.data = {value: 'test'};
  }

  render() {
    return html`<input .value=${live(this.data.value)} />`;
  }
}
customElements.define('my-element', MyElement);
```

#### `unsafeHTML` / `unsafeSVG`

- Renders a string as HTML rather than text.

```js
const markup = '<h3>Some HTML to render.</h3>';

class MyElement extends LitElement {
  render() {
    return html`
      Look out, potentially unsafe HTML ahead: ${unsafeHTML(markup)}
    `;
  }
}
```

#### `until`

- Renders placeholder content until one or more promises resolve.

```js
class MyElement extends LitElement {
  static properties = {
    content: {state: true},
  };

  constructor() {
    super();
    this.content = fetch('./content.txt').then((r) => r.text());
  }

  render() {
    return html`${until(this.content, html`<span>Loading...</span>`)}`;
  }
}
```
