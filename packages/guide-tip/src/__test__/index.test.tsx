import * as React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../../tests/mountTest';
import GuideTip from '../index';

mountTest(GuideTip);

describe('GuideTip', () => {
  it('render button count correctly', () => {
    const component = mount(<GuideTip title="Title">Test</GuideTip>);
    expect(component.find('button').text()).toBe('Test');
  });
});
