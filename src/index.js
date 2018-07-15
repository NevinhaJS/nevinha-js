/*eslint-disable */
/** @jsx h */
function h(type, attributes, ...args) {
	const children = args.length ? [].concat(...args) : [];
	return {type, attributes: attributes || {}, children};
}
/*eslint-enable */

import NevinhaComponent from './NevinhaComponent';
import NevinhaRender from './dom/client/render';

class Form extends NevinhaComponent {
	constructor() {
		super();

		this.teste = this.teste.bind(this);
		this.state.nevinha = 'asd';
	}

	teste() {
		this.setState({
			nevinha: 'oi'
		});
	}

	componentWillMount() {}

	componentDidMount() {}

	render() {
		return (
			<div class="form">
				<input
					data-state={this.state.nevinha}
					onClick={this.teste}
					type="text"
				/>

				{this.state.nevinha == 'oi' && <p>Passou!</p>}
			</div>
		);
	}
}

class App extends NevinhaComponent {
	render() {
		return (
			<div class="asds">
				<Form />

				<ul>
					<li>asd</li>
				</ul>
			</div>
		);
	}
}

const $root = document.querySelector('#my-app');
NevinhaRender(App, $root);