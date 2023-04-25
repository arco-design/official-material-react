import React from 'react';
import { render } from '@testing-library/react';
import DocSearch from '../index';

describe('DocSearch', () => {
  it('render content', () => {
    render(<DocSearch />);
  });
});
