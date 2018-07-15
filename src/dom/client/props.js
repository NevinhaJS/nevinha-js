import {isEvent} from './events';

export const setProps = ($el, props) => {
	Object.keys(props).forEach(prop => {
		if (isEvent(prop)) {
			const eventName = prop.split('on')[1].toLowerCase();
			$el.addEventListener(eventName, props[prop]);
		} else {
			setProp($el, prop, props[prop]);
		}
	});
};

export const setProp = ($el, name, value) => {
	if (isCustomProp(name)) {
		return;
	}

	if (name === 'className') {
		return $el.setAttribute('class', value);
	}

	if (typeof value === 'boolean') {
		return setBooleanProp($el, name, value);
	}

	if(name == 'value'){
		return $el.value = value;
	}

	return $el.setAttribute(name, value);
};

export const setBooleanProp = ($el, name, value) => {
	if (value) {
		$el.setAttribute(name, value);
		$el[name] = true;
	} else {
		$el[name] = false;
	}
};

export const removeBooleanProp = ($el, name) => {
	$el.removeAttribute(name);
	$el[name] = false;
};

export const removeProp = ($el, name, value) => {
	if (isCustomProp(name)) {
		return;
	} else if (name === 'className') {
		$el.removeAttribute('class');
	} else if (typeof value === 'boolean') {
		removeBooleanProp($el, name);
	} else {
		$el.removeAttribute(name);
	}
};

export const updateProp = ($el, name, newVal, oldVal) => {
	if (!newVal) {
		removeProp($el, name, oldVal);
	} else if (!oldVal || newVal !== oldVal) {
		setProp($el, name, newVal);
	}
};

export const updateProps = ($target, newProps, oldProps = {}) => {
	const props = Object.assign({}, newProps, oldProps);

	Object.keys(props).forEach(name => {
		updateProp($target, name, newProps[name], oldProps[name]);
	});
};

export const isCustomProp = () => {
	return false;
};