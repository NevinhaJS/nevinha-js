import {isPXUnit} from '../../isomorphic/nevinha-is';

const supportTypedOM = () => window.CSS && CSS.number;

const fromPixelToFloat = value => parseFloat(value.replace('px', ''));

const formatCSSValue = value => {
  if (typeof value == 'number') return CSS.number(value);

  if (typeof value == 'string' && isPXUnit(value)) {
    return CSS.px(fromPixelToFloat(value));
  }

  return value;
};

const blackPropsList = value => {
  if (value == 'sticky') return true;
};

/**
 * @param {HTMLNode} $el The element target
 * @param {string} prop the CSS attribute name
 * @param {any} value the value that will be attached on the elment
 */
export const setTypedStyle = ($el, prop, value) => {
  if (supportTypedOM()) {
    $el.attributeStyleMap.set(prop, formatCSSValue(value));

    return;
  }

  if (blackPropsList(value)) {
    $el.style[prop] = `-webkit-${value}`;
  }

  return ($el.style[prop] = value);
};

/**
 * @param {HTMLNode} $el The element target
 * @param {string} prop the CSS attribute name
 * @param {any} value the value that will be attached on the elment
 */
export const removeTypedStyle = ($el, prop) => {
  if (supportTypedOM()) {
    return $el.attributeStyleMap.delete(prop);
  }

  $el.style.removeProperty(prop);
};

export const setVisibleState = $el => {
  setTypedStyle($el, 'opacity', 1);
  setTypedStyle($el, 'display', 'inherit');
  setTypedStyle($el, 'visibility', 'visible');
};

/**
 * @param {HTMLNode} $el The element target
 * @param {string} prop the CSS attribute name
 * @param {float} speed the speed of the transition
 * @param {string} timingFn the transition timing function
 * wich can be ease-in, ease-out, ease-in-out, linear, ease or a cubic-bezier function
 */
export const setTransition = ($el, prop, speed, timingFn) => {
  return setTypedStyle($el, 'transition', `${prop} ${speed}s ${timingFn}`);
};