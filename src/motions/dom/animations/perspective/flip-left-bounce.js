import {getValue} from '../../motions-props';
import {addComponentContextAnimation} from '../../../providers/animations';
import {setVisibleState} from '../../../providers/CSSProvider';

const MOTION = 'flipLeftBounce';
const keyframes = [
  {
    opacity: 0,
    transform: 'rotateY(70deg)'
  },
  {
    opacity: 0.5,
    transform: 'rotateY(-5deg)'
  },
  {
    opacity: 0.8,
    transform: 'rotateY(20deg)'
  },
  {
    opacity: 1,
    transform: 'rotateY(0deg)'
  }
];

const setflipLeftBounce = ($el, values, contextRef) => {
  setVisibleState($el);

  const speed = getValue(values, 'speed', MOTION) * 1000;
  const animation = $el.animate(keyframes, {
    duration: speed,
    easing: 'ease-in-out',
    fill: 'forwards'
  });

  addComponentContextAnimation(animation, contextRef);
};

export const flipLeftBounce = {
  callFn: setflipLeftBounce,
  values: {
    speed: {
      defaultValue: 1
    }
  }
};
