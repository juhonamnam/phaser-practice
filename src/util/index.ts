type Component<TagName extends keyof HTMLElementTagNameMap> = {
  tag: TagName;
  init?: (self: HTMLElementTagNameMap[TagName]) => void;
  options?: ElementCreationOptions;
  props?: {
    [prop in keyof HTMLElementTagNameMap[TagName]]?: HTMLElementTagNameMap[TagName][prop];
  };
  events?: Parameters<HTMLElementTagNameMap[TagName]["addEventListener"]>[];
  children?: (string | Node)[];
};

export const element = <T extends keyof HTMLElementTagNameMap>(
  component: Component<T>
) => {
  const element = document.createElement(component.tag, component.options);

  if (component.init) component.init(element);

  if (component.props) Object.assign(element, component.props);

  if (component.events)
    component.events.forEach((params) => {
      element.addEventListener(params[0], params[1], params[2]);
    });

  if (component.children) element.append(...component.children);

  return element;
};
