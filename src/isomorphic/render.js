/**
 * @param {object} node The object that will be parsed to htmlNode with it respective children
 */
export const createVirtualElement = (
  node,
  {createTextNode, createInstance, parentComponent, $node}
) => {
  if(!node) return;

  const {type, attributes, children} = node;

  if (typeof node == 'string' || typeof node == 'number') {
    return createTextNode(node);
  }

  if (typeof type == 'function' && type.prototype.render) {
    let context = {};

    if(parentComponent && parentComponent.context.store) {
      context = parentComponent.context;
    }

    const instance = new type(attributes, context); // eslint-disable-line
    instance.children = children;

    if(instance.getChildContext) {
      instance.context = {
        ...instance.getChildContext(),
        ...instance.context
      }
    }

    const createdElement = createVirtualElement(instance.render(), {
      createInstance,
      createTextNode,
      parentComponent: instance,
      $node
    });

    instance.element = createdElement;
    instance.parentNode = instance.element.parentNode;

    if(!instance.element.data){
      instance.element.data = {};
    }

    if($node) instance.componentUnmount();

    instance.element.data[type.name] = instance;

    return createdElement;
  }

  if (typeof type == 'function') {
    return createVirtualElement(type(attributes, children), {
      createInstance,
      createTextNode,
      parentComponent
    });
  }

  if (!children) {
    return;
  }

  return createInstance(type, attributes, children, parentComponent);
};