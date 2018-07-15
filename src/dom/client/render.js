import {setProps, updateProps} from './props';
import {createVirtualElement} from '../../isomorphic/index';

/**
 * @param {NevinhaClass} component The instance that should rerender.
 * @param {htmlNode} $node The node where the component will be attached
 */
export const render = (Component, $node) => {
	const instance = new Component();
	instance.element = createVirtualElement(instance.render(), {
		createInstance,
		createTextNode,
		parentComponent: instance
	});
	$node.appendChild(instance.element);
};

export const createTextNode = nodeText => {
	return document.createTextNode(nodeText);
};

export const createInstance = (nodeType, props, children, parentComponent) => {
	const $el = document.createElement(nodeType);

	children
		.map(node =>
			createVirtualElement(node, {
				createInstance,
				createTextNode,
				parentComponent
			})
		)
		.forEach(newNode => {
			if (newNode) {
				$el.appendChild(newNode);
			}
		});

	setProps($el, props, parentComponent);

	return $el;
};

export const diffDOM = {
	addToDiff: ($parent, newNode, parentComponent) => {
		$parent.appendChild(
			createVirtualElement(newNode, {
				createInstance,
				createTextNode,
				parentComponent
			})
		);
	},

	removeFromDiff: ($parent, _, __, index) => {
		$parent.removeChild($parent.childNodes[index]);
	},

	replaceFromDiff: ($parent, newNode, _, parentComponent, index) => {
		$parent.replaceChild(
			createVirtualElement(newNode, {
				createInstance,
				createTextNode,
				parentComponent
			}),
			$parent.childNodes[index]
		);
	},

	updatePropsFromDiff: (
		$parent,
		newNode,
		oldNode,
		parentComponent,
		index
	) => {
		updateProps(
			$parent.childNodes[index],
			newNode.attributes,
			oldNode.attributes,
			parentComponent
		);
	}
};