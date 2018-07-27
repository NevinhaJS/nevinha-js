import {getValue} from '../../motions-props';

const PULSE_MOTION = 'pulse';
const pulseKeyFrames = [
  {
    transform: 'scale(1)'
  },
  {
    transform: 'scale(1.5)'
  }
];

const setPulseAnimation = ($el, values) => {
  const speed = getValue(values, 'speed', PULSE_MOTION) * 1000;

  return $el.animate(pulseKeyFrames, {
    direction: 'alternate',
    duration: speed,
    easing: 'linear',
    iterations: Infinity
  });
};

export const pulse = {
  callFn: setPulseAnimation,
  values: {
    speed: {
      defaultValue: 0.5
    }
  }
};