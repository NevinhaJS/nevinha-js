/**
 * Generates a virtual DOM representation as a plane Object
 *
 * @param {(string|function)} type - Element type
 * @param {object} attributes - All Props and values
 * @param {...(string|vdom|array)} ...args -  Child elements
 *
 * @returns {object} Virtual DOM representation as a plane object
 *
 */
/*eslint-disable */
/** @jsx NevinhaDOM */
const NevinhaDOM = (type, attributes, ...args) => {
	const children = args.length ? [].concat(...args) : [];
	return {type, attributes: attributes || {}, children};
};
/*eslint-enable */

export default NevinhaDOM;