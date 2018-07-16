import {updateElement, IsomorphicNevinhaComponent} from './isomorphic/index';
import {diffDOM} from './dom/client/index';

class NevinhaComponent extends IsomorphicNevinhaComponent {
	constructor(props, children) {
		super(props, children);
	}

	setState(states) {
		const currentElement = this.render();

		Object.keys(states).map(key => (this.state[key] = states[key]));
		updateElement(this, currentElement, diffDOM);
	}
}

export {NevinhaComponent};