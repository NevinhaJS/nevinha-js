import {isEvent} from './events';
import {isCustomProp} from '../../isomorphic/nevinha-is';
import {removeContextRef, addContextRef} from '../../isomorphic/diff';
import {definedMotionsProps, setTypedStyle} from '../../motions/index';

export const setProps = ($el, props, parentComponent) => {
  Object.keys(props).forEach(prop => {
    if (isEvent(prop)) {
      const eventName = prop.split('on')[1].toLowerCase();
      $el.addEventListener(eventName, props[prop]);
    } else {
      setProp($el, prop, props[prop], parentComponent);
    }
  });
};

export const setProp = ($el, name, value, parentComponent) => {
  if (isCustomProp(name) && value) {
    return setCustomProp($el, name, value, parentComponent);
  }

  if (name === 'className') {
    return $el.setAttribute('class', value);
  }

  if (typeof value === 'boolean') {
    return setBooleanProp($el, name, value);
  }

  if (name == 'value') {
    return ($el.value = value);
  }

  if (name == 'ref') {
    return addContextRef(parentComponent, value, {
      element: $el
    });
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

export const updateProp = ($el, name, newVal, oldVal, parentComponent) => {
  if (newVal !== '' && !newVal) {
    return removeProp($el, name, oldVal);
  }

  if (!oldVal || newVal !== oldVal) {
    return setProp($el, name, newVal, parentComponent);
  }
};

export const updateProps = (
  $target,
  newProps,
  oldProps = {},
  parentComponent
) => {
  const props = Object.assign({}, newProps, oldProps);

  if (!newProps.ref && oldProps.ref) {
    removeContextRef(parentComponent, oldProps.ref);
  }

  Object.keys(props).forEach(name => {
    updateProp(
      $target,
      name,
      newProps[name],
      oldProps[name],
      parentComponent
    );
  });
};

export const setStyleProps = ($el, value) => {
  const values = value.split(';');

  if (!values[values.length - 1].trim()) {
    values.splice(-1, 1);
  }

  const stylesMap = values.map(cssValue => {
    const splitedValue = cssValue.split(':');

    return {
      property: splitedValue[0].trim(),
      value: splitedValue[1].trim()
    };
  });

  stylesMap.forEach(style => setTypedStyle($el, style.property, style.value));
};

export const setCustomProp = ($el, name, value) => {
  if (name == 'style') return setStyleProps($el, value);

  return definedMotionsProps[name].callFn($el, value);
};