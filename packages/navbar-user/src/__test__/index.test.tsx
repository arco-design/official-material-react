import * as React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../../tests/mountTest';
import NavbarUser from '../index';

mountTest(NavbarUser);

describe('NavbarUser', () => {
  it('render button count correctly', () => {
    const component = mount(<NavbarUser title="Title">Test</NavbarUser>);
    expect(component.find('button').text()).toBe('Test');
  });
});
