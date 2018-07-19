/**
 * @param {object} node The object that will be parsed to htmlNode with it respective children
 */
export const createVirtualElement = (
  node,
  {createTextNode, createInstance, parentComponent}
) => {
  const {type, attributes, children} = node;

  if (typeof node == 'string' || typeof node == 'number') {
    return createTextNode(node);
  }

  if (typeof type == 'function' && type.prototype.render) {
		const instance = new type(attributes, children); // eslint-disable-line
    const createdElement = createVirtualElement(instance.render(), {
      createInstance,
      createTextNode,
      parentComponent: instance
    });

    instance.element = createdElement;

    return createdElement;
  }

  if (typeof type == 'function') {
    return createVirtualElement(type(attributes), {
      createInstance,
      createTextNode
    });
  }

  if (!children) {
    return;
  }

  return createInstance(type, attributes, children, parentComponent);
};