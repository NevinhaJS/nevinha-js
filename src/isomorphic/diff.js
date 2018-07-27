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
  if (!oldNode && !newNode) return;

  if (newNode && typeof newNode.type == 'function') {
    const {NewNodeComponent, OldNodeComponent} = updateComponentDiff(
      newNode,
      oldNode
    );

    newNode = NewNodeComponent;
    oldNode = OldNodeComponent;
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

const updateComponentDiff = (NewNodeComponent, OldNodeComponent) => {
  if (isClass(NewNodeComponent.type)) {
		const NewNodeInstance = new NewNodeComponent.type( // eslint-disable-line
      NewNodeComponent.attributes,
      NewNodeComponent.children
    );
		const oldNodeInstance = new OldNodeComponent.type( // eslint-disable-line
      OldNodeComponent.attributes,
      OldNodeComponent.children
    );

    NewNodeInstance.element = createVirtualElement(NewNodeComponent, {
      createInstance,
      createTextNode,
      parentComponent: NewNodeInstance
    });
    oldNodeInstance.element = createVirtualElement(OldNodeComponent, {
      createInstance,
      createTextNode,
      parentComponent: oldNodeInstance
    });

    NewNodeComponent = NewNodeInstance.render();
    OldNodeComponent = oldNodeInstance.render();
  } else {
    NewNodeComponent = Object.assign(
      NewNodeComponent.type(NewNodeComponent.attributes, NewNodeComponent.children)
    );
    OldNodeComponent = Object.assign(
      OldNodeComponent.type(OldNodeComponent.attributes, OldNodeComponent.children)
    );
  }

  return {
    NewNodeComponent,
    OldNodeComponent
  };
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