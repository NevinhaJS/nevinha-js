import {getValue} from '../../motions-props';

const BOMB_MOTION = 'bomb';
const bombKeyFrames = [
  {
    opacity: 1,
    transform: 'rotateZ(0)',
    transformOrigin: '-50% 0%',
    visibility: 'visible'
  },
  {
    opacity: 0,
    transform: 'rotateZ(-100deg)',
    transformOrigin: '-10% 0%',
    visibility: 'hidden'
  }
];

const setBombAnimation = ($el, values) => {
  const speed = getValue(values, 'speed', BOMB_MOTION) * 1000;
  $el.animate(bombKeyFrames, {
    duration: speed,
    easing: 'cubic-bezier(0, 0.93, 1, 1)',
    fill: 'forwards'
  });
};

export const bomb = {
  callFn: setBombAnimation,
  values: {
    speed: {
      defaultValue: 0.4
    }
  }
};