import {
  updateElement,
  IsomorphicNevinhaComponent
} from '../../isomorphic/isomorphic';
import {diffDOM} from './client';
import {definedMotionsProps} from '../../motions/dom/motions-props';

class NevinhaComponent extends IsomorphicNevinhaComponent {
  constructor(props, context) {
    super(props, context);
  }

  getElementIndex() {
    const parentNode = this.getParentNode();

    return Array.prototype.slice
      .call(parentNode.childNodes)
      .indexOf(this.element);
  }

  getParentNode() {
    let parentNode = this.element.parentNode;

    if (!parentNode) parentNode = this.parentNode;

    return parentNode;
  }

  removeAnimation(ref) {
    if (!ref.animation) return;

    if (!ref.animation.infinite) {
      ref.animation.config.finish();
    }

    ref.animation.config.cancel();

    ref.animation = null;
  }

  setAnimation(ref, config) {
    const {name, values} = config;

    if (ref.animation) {
      this.removeAnimation(ref);
    }

    definedMotionsProps[name].callFn(ref.element, values, ref);
  }

  setState(states) {
    const currentElement = this.render();

    Object.keys(states).map(key => (this.state[key] = states[key]));

    const index = this.getElementIndex();

    if(index === -1) return;

    updateElement(
      this,
      currentElement,
      diffDOM,
      this.getParentNode(),
      this.render(),
      index
    );
  }
}

export {NevinhaComponent};