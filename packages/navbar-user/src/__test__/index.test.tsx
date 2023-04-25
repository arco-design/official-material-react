import React from 'react';
import { render } from '@testing-library/react';
import NavbarUser from '../index';

describe('NavbarUser', () => {
  it('render content', () => {
    render(<NavbarUser />);
  });
});
