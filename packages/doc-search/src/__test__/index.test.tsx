import * as React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../../tests/mountTest';
import DocSearch from '../index';

mountTest(DocSearch);

describe('DocSearch', () => {
  it('render button count correctly', () => {
    const component = mount(<DocSearch title="Title">Test</DocSearch>);
    expect(component.find('button').text()).toBe('Test');
  });
});
