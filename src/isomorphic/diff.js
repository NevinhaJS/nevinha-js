import {isClass} from './nevinha-is';

export const updateElement = (
  parentComponent,
  oldNode,
  {addToDiff, removeFromDiff, replaceFromDiff, updatePropsFromDiff},
  $parent = parentComponent.element.parentNode,
  newNode = parentComponent.render(),
  index = 0
) => {
  if (!oldNode && !newNode) return;

  if (typeof newNode.type == 'function' && !isClass(newNode.type)) {
    newNode = newNode.type(newNode.attributes);
  }

  if (!oldNode) {
    addToDiff($parent, newNode, parentComponent);
  } else if (!newNode) {
    updateContext(parentComponent, oldNode);
    removeFromDiff($parent, newNode, oldNode, index);
  } else if (changed(newNode, oldNode)) {
    updateContext(parentComponent, oldNode);
    replaceFromDiff($parent, newNode, oldNode, parentComponent, index);
  } else if (newNode.type) {
    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;

    updatePropsFromDiff($parent, newNode, oldNode, parentComponent, index);

    for (let i = 0; i < newLength || i < oldLength; i++) {
      updateElement(
        parentComponent,
        oldNode.children[i],
        {
          addToDiff,
          removeFromDiff,
          replaceFromDiff,
          updatePropsFromDiff
        },
        $parent.childNodes[index],
        newNode.children[i],
        i
      );
    }
  }
};

export const updateContext = (parentComponent, {attributes, children}) => {
  if (!attributes) return;

  const {ref} = attributes;

  if (ref) {
    removeContextRef(parentComponent, ref);
  }

  if (children.length) {
    children.forEach(child => updateContext(parentComponent, child));
  }
};

export const removeContextRef = (parentComponent, ref) => {
  delete parentComponent.context[ref];
};

export const addContextRef = (parentComponent, ref, value) => {
  return (parentComponent.context[ref] = value);
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