export const isEvent = attr => {
  return /^on/.test(attr);
};

export const formatEventName = eventName =>
  eventName.split('on')[1].toLowerCase();