import {getValue} from '../../motions-props';
import {hideElementToAnimate} from '../../../providers/animations';

const ENTER_RIGHT_MOTION = 'enterRightBounce';
const enterRightKeyFrames = [
  {
    opacity: 0,
    transform: 'translateX(120px)',
    visibility: 'hidden'
  },
  {
    offset: 0.5,
    opacity: 0.5,
    transform: 'translateX(0px)',
    visibility: 'visible'
  },
  {
    offset: 0.7,
    opacity: 0.7,
    transform: 'translateX(8px)',
    visibility: 'visible'
  },
  {
    opacity: 1,
    transform: 'translateY(0)',
    visibility: 'visible'
  }
];

const setEnterRightBounce = ($el, values) => {
  const speed = getValue(values, 'speed', ENTER_RIGHT_MOTION) * 1000;

  hideElementToAnimate($el, enterRightKeyFrames, {
    duration: speed,
    easing: 'linear',
    fill: 'forwards'
  });
};

export const enterRightBounce = {
  callFn: setEnterRightBounce,
  values: {
    speed: {
      defaultValue: 0.7
    }
  }
};