export const isClass = func => {
  return func.prototype.render;
export const isPXUnit = value => {
  return /px$/.test(value);
};

export const isNumber = value => typeof value === 'number';
};