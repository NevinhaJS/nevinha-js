import {setTypedStyle} from './CSSProvider';

/**
 * Behaves the same as setTimeout except uses requestAnimationFrame() where possible for better performance
 * @param {function} fn The callback function
 * @param {int} delay The delay in milliseconds
 */
export const requestTimeout = function(fn, delay = 1) {
  if (
    !window.requestAnimationFrame &&
		!window.webkitRequestAnimationFrame &&
		!(
		  window.mozRequestAnimationFrame &&
			window.mozCancelRequestAnimationFrame
		) && // Firefox 5 ships without cancel support
		!window.oRequestAnimationFrame &&
		!window.msRequestAnimationFrame
  )
    return window.setTimeout(fn, delay);

  const start = new Date().getTime();

  const animationLoop = () => {
    const current = new Date().getTime();
    const delta = current - start;

    delta >= delay ? fn() : requestAnimationFrame(animationLoop);
  };

  requestAnimationFrame(animationLoop);
};

export const hideElementToAnimate = (
  $el,
  animationFn,
  animationConfig,
  contextRef
) => {
  setTypedStyle($el, 'display', 'inherit');
  setTypedStyle($el, 'opacity', 0);
  setTypedStyle($el, 'visibility', 'hidden');

  requestTimeout(() => {
    const animation = $el.animate(animationFn, animationConfig);
    addComponentContextAnimation(animation, contextRef);
  }, 0);
};

export const addComponentContextAnimation = (
  animation,
  contextRef,
  infinite
) => {
  if (contextRef) {
    contextRef.animation = {
      config: animation,
      infinite
    };
  }
};