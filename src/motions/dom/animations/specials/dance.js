import {getValue} from '../../motions-props';
import {addComponentContextAnimation} from '../../../providers/animations'
import {setVisibleState} from '../../../providers/CSSProvider';

const DANCE_MOTION = 'dance';
const danceKeyFrames = [
  {
    boxShadow: 'inset 0 0 0 0 transparent',
    transform: 'scale(1) rotateZ(10deg)'
  },
  {
    boxShadow: 'inset 0 0 0 0 transparent',
    offset: 0.05,
    transform: 'scale(1) rotateZ(-10deg)'
  },
  {
    boxShadow: 'inset 0 0 0 0 transparent',
    offset: 0.1,
    transform: 'scale(1) rotateZ(10deg)'
  },
  {
    boxShadow: 'inset 0 0 0 0 transparent',
    offset: 0.15,
    transform: 'scale(1) rotateZ(-10deg)'
  },
  {
    boxShadow: 'inset 0 0 0 0 transparent',
    offset: 0.2,
    transform: 'scale(1) rotateZ(10deg)'
  },
  {
    boxShadow: 'inset 0 0 0 0 transparent',
    offset: 0.25,
    transform: 'scale(1) rotateZ(-10deg)'
  },
  {
    boxShadow: 'inset 0 0 0 0 transparent',
    offset: 0.35,
    transform: 'scale(1) rotateZ(0deg)'
  },
  {
    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
    offset: 0.4,
    transform: 'scale(1.3) rotateZ(0deg)'
  },
  {
    boxShadow: 'inset 0 0 0 0 transparent',
    offset: 0.6,
    transform: 'scale(1) rotateZ(0deg)'
  },
  {
    boxShadow: 'inset 0 0 0 0 transparent',
    transform: 'scale(1) rotateZ(0deg)'
  }
];

const setDanceAnimation = ($el, values, contextRef) => {
  setVisibleState($el);

  const speed = getValue(values, 'speed', DANCE_MOTION) * 1000;
  const animation = $el.animate(danceKeyFrames, {
    duration: speed,
    easing: 'linear',
    fill: 'forwards'
  });

  addComponentContextAnimation(animation, contextRef)
};

export const dance = {
  callFn: setDanceAnimation,
  values: {
    speed: {
      defaultValue: 2
    }
  }
};