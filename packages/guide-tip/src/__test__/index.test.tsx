import React from 'react';
import { render } from '@testing-library/react';
import GuideTip from '../index';

describe('GuideTip', () => {
  it('render content', () => {
    render(<GuideTip />);
  });
});
