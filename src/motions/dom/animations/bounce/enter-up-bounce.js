import {getValue} from '../../motions-props';
import {hideElementToAnimate} from '../../../providers/animations';

const ENTER_UP_MOTION = 'enterUpBounce';
const enterUpKeyFrames = [
  {
    opacity: 0,
    transform: 'translateY(120px)',
    visibility: 'hidden'
  },
  {
    offset: 0.5,
    opacity: 0.5,
    transform: 'translateY(0)',
    visibility: 'visible'
  },
  {
    offset: 0.7,
    opacity: 0.7,
    transform: 'translateY(20px)',
    visibility: 'visible'
  },
  {
    opacity: 1,
    transform: 'translateY(0)',
    visibility: 'visible'
  }
];

const setEnterUpBounce = ($el, values) => {
  const speed = getValue(values, 'speed', ENTER_UP_MOTION) * 1000;

  hideElementToAnimate($el, enterUpKeyFrames, {
    duration: speed,
    easing: 'linear',
    fill: 'forwards'
  });
};

export const enterUpBounce = {
  callFn: setEnterUpBounce,
  values: {
    speed: {
      defaultValue: 0.7
    }
  }
};