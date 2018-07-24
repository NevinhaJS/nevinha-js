import {
  updateElement,
  IsomorphicNevinhaComponent
} from '../../isomorphic/isomorphic';
import {diffDOM} from './client';

class NevinhaComponent extends IsomorphicNevinhaComponent {
  constructor(props, children) {
    super(props, children);
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