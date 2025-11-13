/**
 * @typedef {import('lit').LitElement} LitElement
 * @param {LitElement} component - The component instance
 * @param {Object} props - The properties definition object
 */
export const applyDefaultProps = (component, props) => {
  for (const key in props) {
    component[key] = props[key];
  }
};
