import {getValue} from '../../motions-props';

const SCALE_BOUNCE_MOTION = 'scaleBounce';
const scaleBounceKeyFrames = [
  {
    opacity: 0,
    transform: 'scale(1.5)'
  },
  {
    offset: 0.5,
    opacity: 0.5,
    transform: 'scale(1)'
  },
  {
    offset: 0.7,
    opacity: 0.7,
    transform: 'scale(1.1)'
  },
  {
    opacity: 1,
    transform: 'scale(1)'
  }
];

const setScaleBounce = ($el, values) => {
  const speed = getValue(values, 'speed', SCALE_BOUNCE_MOTION) * 1000;

  $el.animate(scaleBounceKeyFrames, {
    duration: speed,
    easing: 'linear',
    fill: 'forwards'
  });
};

export const scaleBounce = {
  callFn: setScaleBounce,
  values: {
    speed: {
      defaultValue: 0.7
    }
  }
};