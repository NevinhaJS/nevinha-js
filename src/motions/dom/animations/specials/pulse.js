import {getValue} from '../../motions-props';
import {addComponentContextAnimation} from '../../../providers/animations';
import {setVisibleState} from '../../../providers/CSSProvider';

const PULSE_MOTION = 'pulse';
const pulseKeyFrames = [
  {
    transform: 'scale(1)'
  },
  {
    transform: 'scale(1.5)'
  }
];

const setPulseAnimation = ($el, values, contextRef) => {
  setVisibleState($el);

  const speed = getValue(values, 'speed', PULSE_MOTION) * 1000;
  const animation = $el.animate(pulseKeyFrames, {
    direction: 'alternate',
    duration: speed,
    easing: 'linear',
    iterations: Infinity
  });

  addComponentContextAnimation(animation, contextRef, true);
};

export const pulse = {
  callFn: setPulseAnimation,
  values: {
    speed: {
      defaultValue: 0.5
    }
  }
};
