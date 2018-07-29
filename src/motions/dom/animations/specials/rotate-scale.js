import {getValue} from '../../motions-props';
import {addComponentContextAnimation} from '../../../providers/animations';
import {setVisibleState} from '../../../providers/CSSProvider';

const ROTATE_SCALE_MOTION = 'rotateScale';
const rotateScaleKeyFrames = [
  {
    transform: 'rotateZ(0) scale(1)'
  },
  {
    offset: 0.25,
    transform: 'rotateZ(90deg) scale(0.4)'
  },
  {
    offset: 0.5,
    transform: 'rotateZ(180deg) scale(1)'
  },
  {
    offset: 0.75,
    transform: 'rotateZ(270deg) scale(0.4)'
  },
  {
    transform: 'rotateZ(360deg) scale(1)'
  }
];

const setRotateScaleAnimation = ($el, values, contextRef) => {
  setVisibleState($el);

  const speed = getValue(values, 'speed', ROTATE_SCALE_MOTION) * 1000;
  const animation = $el.animate(rotateScaleKeyFrames, {
    duration: speed,
    easing: 'linear',
    iterations: Infinity
  });

  addComponentContextAnimation(animation, contextRef, true);
};

export const rotateScale = {
  callFn: setRotateScaleAnimation,
  values: {
    speed: {
      defaultValue: 3
    }
  }
};