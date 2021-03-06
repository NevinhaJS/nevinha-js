import {getValue} from '../../motions-props';
import {addComponentContextAnimation} from '../../../providers/animations';
import {setVisibleState} from '../../../providers/CSSProvider';

const JUMP_BOUNCE_MOTION = 'jumpBounce';
const jumpBounceKeyFrames = [
  {
    transform: 'translateY(0)'
  },
  {
    offset: 0.1,
    transform: 'translateY(-100px)'
  },
  {
    offset: 0.4,
    transform: 'translateY(20px)'
  },
  {
    offset: 0.6,
    transform: 'translateY(-60px)'
  },
  {
    offset: 0.9,
    transform: 'translateY(30px)'
  },
  {
    transform: 'translateY(0)'
  }
];

const setJumpBounce = ($el, values, contextRef) => {
  setVisibleState($el);

  const speed = getValue(values, 'speed', JUMP_BOUNCE_MOTION) * 1000;
  const animation = $el.animate(jumpBounceKeyFrames, {
    duration: speed,
    easing: 'cubic-bezier(0.42, 0, 0.44, 1.21)',
    fill: 'forwards'
  });

  addComponentContextAnimation(animation, contextRef);
};

export const jumpBounce = {
  callFn: setJumpBounce,
  values: {
    speed: {
      defaultValue: 1
    }
  }
};
