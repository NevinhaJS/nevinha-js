import {getValue} from '../../motions-props';
import {addComponentContextAnimation} from '../../../providers/animations'
import {setVisibleState} from '../../../providers/CSSProvider';

const FLASH_MOTION = 'flash';
const flashKeyFrames = {
  offset: [0, 0.1, 0.2, 0.3, 1],
  opacity: [0, 1, 0, 1, 1]
};

const setFlashAnimation = ($el, values, contextRef) => {
  setVisibleState($el);

  const speed = getValue(values, 'speed', FLASH_MOTION) * 1000;
  const animation = $el.animate(flashKeyFrames, {
    duration: speed,
    easing: 'linear'
  });

  addComponentContextAnimation(animation, contextRef);
};

export const flash = {
  callFn: setFlashAnimation,
  values: {
    speed: {
      defaultValue: 2
    }
  }
};