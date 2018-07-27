import {isClass} from './nevinha-is';
import {createVirtualElement} from './render';
import {createTextNode, createInstance} from '../dom/client/render';

export const updateElement = (
  parentComponent,
  oldNode,
  {addToDiff, removeFromDiff, replaceFromDiff, updatePropsFromDiff},
  $parent,
  newNode,
  index = 0
) => {
  let newParentCompeonent = parentComponent;

  if (!oldNode && !newNode) return;

  if (newNode && typeof newNode.type == 'function') {
    const {NodeComponent, NodeComponentInstance} = updateComponentDiff(newNode);

    newNode = NodeComponent;

    if(NodeComponentInstance) newParentCompeonent = NodeComponentInstance;
  }

  if (oldNode && typeof oldNode.type == 'function') {
    const {NodeComponent} = updateComponentDiff(oldNode);

    oldNode = NodeComponent;
  }

  if (!oldNode) {
    addToDiff($parent, newNode, newParentCompeonent);
  } else if (!newNode) {
    updateContext(newParentCompeonent, oldNode);
    removeFromDiff($parent, newNode, oldNode, index);
    return true;
  } else if (changed(newNode, oldNode)) {
    updateContext(newParentCompeonent, oldNode);
    replaceFromDiff($parent, newNode, oldNode, newParentCompeonent, index);
  } else if (newNode.type) {
    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;

    updatePropsFromDiff($parent, newNode, oldNode, newParentCompeonent, index);

    for (let i = 0; i < newLength || i < oldLength; i++) {
      //It's to check if the parentNode is will put back or not the old node
      //Its to avoid null pointer in case of the newNode is smaller than the oldNode
      if(!$parent.childNodes[index].childNodes[i] && oldLength > newLength) return;

      const removedElment = updateElement(
        newParentCompeonent,
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

      if(removedElment && oldLength > newLength){
        i--;
      }
    }
  }
};

const updateComponentDiff = (NodeComponent) => {
  let NodeComponentInstance;

  if (isClass(NodeComponent.type)) {
		NodeComponentInstance = new NodeComponent.type( // eslint-disable-line
      NodeComponent.attributes,
      NodeComponent.children
    );

    NodeComponentInstance.element = createVirtualElement(NodeComponent, {
      createInstance,
      createTextNode,
      parentComponent: NodeComponentInstance
    });
    NodeComponent = NodeComponentInstance.render();
  } else {
    NodeComponent = Object.assign(
      NodeComponent.type(NodeComponent.attributes, NodeComponent.children)
    );
  }

  return {NodeComponent, NodeComponentInstance};
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