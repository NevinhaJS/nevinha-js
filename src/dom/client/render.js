import {setProps, updateProps} from './props';
import {createVirtualElement} from '../../isomorphic/index';

/**
 * @param {NevinhaClass} component The instance that should rerender.
 * @param {htmlNode} $node The node where the component will be attached
 */
export const render = (Component, $node) => {
	const instance = new Component();
	$node.appendChild(
		createVirtualElement(instance.render(), {
			createInstance,
			createTextNode
		})
	);
};

export const createTextNode = nodeText => {
	return document.createTextNode(nodeText);
};

export const createInstance = (nodeType, props, children) => {
	const $el = document.createElement(nodeType);

	setProps($el, props);

	children
		.map(node =>
			createVirtualElement(node, {createInstance, createTextNode})
		)
		.forEach(newNode => {
			if (newNode) {
				$el.appendChild(newNode);
			}
		});

	return $el;
};

export const diffDOM = {
	addToDiff: ($parent, newNode) => {
		$parent.appendChild(
			createVirtualElement(newNode, {createInstance, createTextNode})
		);
	},

	removeFromDiff: ($parent, _, __, index) => {
		$parent.removeChild($parent.childNodes[index]);
	},

	replaceFromDiff: ($parent, newNode, _, index) => {
		$parent.replaceChild(
			createVirtualElement(newNode, {createInstance, createTextNode}),
			$parent.childNodes[index]
		);
	},

	updatePropsFromDiff: ($parent, newNode, oldNode, index) => {
		updateProps(
			$parent.childNodes[index],
			newNode.attributes,
			oldNode.attributes
		);
	}
};