import {NevinhaComponent} from '../../dom/client/client';

class PerspectiveProvider extends NevinhaComponent {
  render() {
    const {children, props} = this;
    const {perspective = '600px'} = props;

    const node = {
      attributes: {
        style: `perspective: ${perspective};`,
        ...props
      },
      children,
      type: 'div'
    };

    return node;
  }
}

export {PerspectiveProvider};