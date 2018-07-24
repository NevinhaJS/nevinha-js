import {setTypedStyle, setTransition} from '../providers/CSSProvider';
import {requestTimeout} from '../providers/animations';
import {isNumber} from '../../isomorphic/nevinha-is';
import {
  flash,
  bomb,
  dance,
  enterDownBounce,
  enterLeftBounce,
  enterRightBounce,
  enterUpBounce,
  journal,
  jumpBounce,
  pulse,
  pulseSlow,
  scaleBounce
} from './animations/animations';

const STICKY_MOTION = 'sticky';
const FADE_OUT_MOTION = 'fadeOut';
const FADE_IN_MOTION = 'fadeOut';
const PARALLAX_MOTION = 'parallax';

export const setStickyPosition = ($el, values) => {
  setTypedStyle($el, 'position', STICKY_MOTION);
  setTypedStyle($el, 'top', getValue(values, 'top', STICKY_MOTION));
};

export const setFadeOut = ($el, values) => {
  const speed = getValue(values, 'speed', FADE_OUT_MOTION);
  const timingFn = getValue(values, 'timingFn', FADE_IN_MOTION);

  requestTimeout(() => setTypedStyle($el, 'display', 'none'), speed * 1000);

  setTransition($el, 'opacity', speed, timingFn);

  requestTimeout(() => setTypedStyle($el, 'opacity', 0));
};

export const setFadeIn = ($el, values) => {
  const speed = getValue(values, 'speed', FADE_IN_MOTION);
  const timingFn = getValue(values, 'timingFn', FADE_IN_MOTION);

  setTypedStyle($el, 'display', 'inherit');
  setTypedStyle($el, 'opacity', 0);
  setTransition($el, 'opacity', speed, timingFn);

  requestTimeout(() => setTypedStyle($el, 'opacity', 1), 0);
};

export const setHide = $el => {
  setTypedStyle($el, 'display', 'none');
};

export const setShow = $el => {
  setTypedStyle($el, 'display', 'inherit');
};

export const setParallax = ($el, values) => {
  const size = getValue(values, 'size', PARALLAX_MOTION);
  setTypedStyle($el, 'transform', `translateZ(${size * -1}px)`);
};

export const definedMotionsProps = {
  bomb,
  dance,
  enterDownBounce,
  enterLeftBounce,
  enterRightBounce,
  enterUpBounce,
  fadeIn: {
    callFn: setFadeIn,
    values: {
      speed: {
        defaultValue: 0.5,
        rulesFn: () => [isNumber]
      },
      timingFn: {
        defaultValue: 'ease-out'
      }
    }
  },
  fadeOut: {
    callFn: setFadeOut,
    values: {
      speed: {
        defaultValue: 1,
        rulesFn: () => [isNumber]
      },
      timingFn: {
        defaultValue: 'ease-out'
      }
    }
  },
  flash,
  hide: {
    callFn: setHide
  },
  journal,
  jumpBounce,
  parallax: {
    callFn: setParallax,
    values: {
      size: {
        defaultValue: 1,
        rulesFn: () => [isNumber]
      }
    }
  },
  pulse,
  pulseSlow,
  scaleBounce,
  show: {
    callFn: setShow
  },
  sticky: {
    callFn: setStickyPosition,
    values: {
      top: {
        defaultValue: '0px'
      }
    }
  }
};

export const getDefaultValues = (values, motionName) => {
  if (typeof values !== 'object')
    return definedMotionsProps[motionName].values;

  return values;
};

export const getValue = (valueConfig, property, motionName) => {
  const propertyConfig = getDefaultValues(true, motionName)[property];
  const userValue = valueConfig[property];

  if (!userValue) return propertyConfig.defaultValue;

  if (propertyConfig.rulesFn) {
    propertyConfig.rulesFn().forEach(rule => {
      const isValid = rule(userValue);

      if (!isValid)
        throw new Error(
          `Invalid CSS value parsed to ${motionName} API. For more details, please read more about '${
            rule.name
          }' function validation in NevinhaJS API`,
          rule
        );
    });
  }

  return userValue;
};