import {NevinhaDOM} from '../nevinha';

describe('NevinhaDOM', () => {
  it('should return a virutal DOM', () => {
    const type = 'string';
    const attributes = {description: 'description', title: 'title'};
    const args = ['arg1', 'arg2', 'arg3'];
    const nevinhaDom = NevinhaDOM(type, attributes, args);

    expect(nevinhaDom).toEqual({
      attributes: {
        description: 'description',
        title: 'title'
      },
      children: ['arg1', 'arg2', 'arg3'],
      type: 'string'
    });
  });
});

describe('NevinhaDOM Empty State', () => {
  const {attributes, children, type} = NevinhaDOM();

  it('should return an empty object for the attributes parameter', () => {
    expect(attributes).toEqual({});
  });

  it('should return an empty array for the children parameter', () => {
    expect(children).toEqual([]);
  });

  it('should return undefined for the type parameter', () => {
    expect(type).toEqual(undefined);
  });
});