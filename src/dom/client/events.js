export const isEvent = attr => {
  return /^on/.test(attr);
};