import {addComponentContextAnimation} from '../../../providers/animations';
import {getValue} from '../../motions-props';
import {setVisibleState} from '../../../providers/CSSProvider';

const PULSE_SLOW_MOTION = 'pulseSlow';
const pulseSlowKeyFrames = [
  {
    opacity: 1,
    transform: 'scale(1)'
  },
  {
    opacity: 0.5,
    transform: 'scale(0.85)'
  }
];

const setPulseSlowAnimation = ($el, values, contextRef) => {
  setVisibleState($el);

  const speed = getValue(values, 'speed', PULSE_SLOW_MOTION) * 1000;
  const animation = $el.animate(pulseSlowKeyFrames, {
    direction: 'alternate',
    duration: speed,
    easing: 'ease-in-out',
    iterations: Infinity
  });

  addComponentContextAnimation(animation, contextRef, true);
};

export const pulseSlow = {
  callFn: setPulseSlowAnimation,
  values: {
    speed: {
      defaultValue: 1
    }
  }
};
