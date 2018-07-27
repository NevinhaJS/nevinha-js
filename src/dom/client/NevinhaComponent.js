import {
  updateElement,
  IsomorphicNevinhaComponent
} from '../../isomorphic/isomorphic';
import {diffDOM} from './client';
import {definedMotionsProps} from '../../motions/dom/motions-props'

class NevinhaComponent extends IsomorphicNevinhaComponent {
  constructor(props, children) {
    super(props, children);
  }

  removeAnimation(ref){
    if(!ref.animation.infinite){
      ref.animation.config.finish();
    }

    ref.animation.config.cancel();

    ref.animation = null;
  }

    const {name, values} = config;

    definedMotionsProps[name].callFn($el, values);
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