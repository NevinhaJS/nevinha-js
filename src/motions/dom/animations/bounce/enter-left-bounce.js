import {getValue} from '../../motions-props';
import {hideElementToAnimate} from '../../../providers/animations';

const ENTER_LEFT_MOTION = 'enterLeftBounce';
const enterLeftKeyFrames = [
  {
    opacity: 0,
    transform: 'translateX(-120px)',
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
    transform: 'translateX(-8px)',
    visibility: 'visible'
  },
  {
    opacity: 1,
    transform: 'translateY(0)',
    visibility: 'visible'
  }
];

const setEnterLeftBounce = ($el, values, contextRef) => {
  const speed = getValue(values, 'speed', ENTER_LEFT_MOTION) * 1000;

  hideElementToAnimate($el, enterLeftKeyFrames, {
    duration: speed,
    easing: 'linear',
    fill: 'forwards'
  }, contextRef);
};

export const enterLeftBounce = {
  callFn: setEnterLeftBounce,
  values: {
    speed: {
      defaultValue: 0.7
    }
  }
};