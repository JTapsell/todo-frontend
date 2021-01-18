import { shallow } from 'enzyme';
import React from 'react';

import { App } from '../App';

describe('App', () => {
  it('should render with all child components', () => {
    // eslint-disable-next-line react/jsx-filename-extension
    const component = shallow(<App />);
    expect(component.find('.App')).toHaveLength(1);
  });
});
