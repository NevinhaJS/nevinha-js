import {definedMotionsProps} from '../motions/dom/motions-props';

export const isClass = func => {
  return func.prototype.render;
};

export const isPXUnit = value => {
  return /px$/.test(value);
};

export const isNumber = value => typeof value === 'number';

export const isCustomProp = propName => {
  if (definedMotionsProps[propName]) return true;

  // if (propName == 'style') return true;
};

export const hasCustomProp = (props = {}) => {
  return Object.keys(definedMotionsProps).filter(key => props[key]).length;
};