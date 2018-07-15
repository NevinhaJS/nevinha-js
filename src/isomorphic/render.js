/**
 * @param {object} node The object that will be parsed to htmlNode with it respective children
 */
export const createVirtualElement = (
	node,
	{createTextNode, createInstance}
) => {
	const {type, attributes, children} = node;

	if (typeof node == 'string') {
		return createTextNode(node);
	}

	if (typeof type == 'function' && type.prototype.render) {
		const instance = new type(attributes); // eslint-disable-line
		const createdElement = createVirtualElement(instance.render(), {
			createInstance,
			createTextNode
		});
		instance.element = createdElement;
		return createdElement;
	} else if (typeof type == 'function') {
		return createVirtualElement(type(), {createInstance, createTextNode});
	} else if (!children) {
		return;
	}

	return createInstance(type, attributes, children);
};