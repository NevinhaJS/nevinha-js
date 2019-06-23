import {getValue} from '../../motions-props';
import {addComponentContextAnimation} from '../../../providers/animations';
import {setVisibleState} from '../../../providers/CSSProvider';

const JOURNAL_MOTION = 'journal';
const journalKeyFrames = [
  {
    transform: 'scale(0) rotate(-360deg)'
  },
  {
    offset: 0.8,
    transform: 'scale(0.5) rotate(-180deg)'
  },
  {
    transform: 'scale(1) rotate(0)'
  }
];

const setJournalAnimation = ($el, values, contextRef) => {
  setVisibleState($el);

  const speed = getValue(values, 'speed', JOURNAL_MOTION) * 1000;
  const animation = $el.animate(journalKeyFrames, {
    duration: speed,
    easing: 'linear',
    fill: 'forwards'
  });

  addComponentContextAnimation(animation, contextRef);
};

export const journal = {
  callFn: setJournalAnimation,
  values: {
    speed: {
      defaultValue: 2
    }
  }
};
