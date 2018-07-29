import {NevinhaComponent} from '../../dom/client/client';

class ParallaxProvider extends NevinhaComponent {
  render() {
    const {children, props} = this;

    const layer = {
      attributes: {},
      children,
      type: 'div'
    };

    const node = {
      attributes: {
        style: 'perspective: 1px; overflow: auto;',
        ...props
      },
      children: [layer],
      type: 'div'
    };

    return node;
  }
}

export {ParallaxProvider};