import {isClass} from './nevinha-is';

//Diff
export const updateElement = (
	$parent,
	newNode,
	oldNode,
	{addToDiff, removeFromDiff, replaceFromDiff, updatePropsFromDiff},
	index = 0
) => {
	if(typeof newNode.type == 'function' && !isClass(newNode.type)){
		newNode = newNode.type(newNode.attributes);
	}

	if (!oldNode) {
		addToDiff($parent, newNode, oldNode, index);
	} else if (!newNode) {
		removeFromDiff($parent, newNode, oldNode, index);
	} else if (changed(newNode, oldNode)) {
		replaceFromDiff($parent, newNode, oldNode, index);
	} else if (newNode.type) {
		const newLength = newNode.children.length;
		const oldLength = oldNode.children.length;

		updatePropsFromDiff($parent, newNode, oldNode, index);

		for (let i = 0; i < newLength || i < oldLength; i++) {
			updateElement(
				$parent.childNodes[index],
				newNode.children[i],
				oldNode.children[i],
				{
					addToDiff,
					removeFromDiff,
					replaceFromDiff,
					updatePropsFromDiff
				},
				i
			);
		}
	}
};

/**
 * @param {object} node1 An jsx node to compare changes
 * @param {object} node2 Another jsx node to compare changes
 */
export const changed = (node1, node2) => {
	return (
		typeof node1 !== typeof node2 ||
		(typeof node1 === 'string' && node1 !== node2) ||
		node1.type !== node2.type
	);
};