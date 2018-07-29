import {
  updateElement,
  IsomorphicNevinhaComponent
} from '../../isomorphic/isomorphic';
import {diffDOM} from './client';
import {definedMotionsProps} from '../../motions/dom/motions-props';

class NevinhaComponent extends IsomorphicNevinhaComponent {
  constructor(props, children) {
    super(props, children);
  }

  removeAnimation(ref) {
    if(!ref.animation) return;

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
    updateElement(
      this,
      currentElement,
      diffDOM,
      this.element.parentNode,
      this.render()
    );
  }
}

export {NevinhaComponent};