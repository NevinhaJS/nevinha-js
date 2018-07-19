export const isClass = func => {
  return func.prototype.render;
export const isPXUnit = value => {
  return /px$/.test(value);
};
};